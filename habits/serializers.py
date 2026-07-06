from rest_framework import serializers
from django.utils import timezone
from .models import Habit, HabitCompletion
from .services import calculate_streak


class HabitSerializer(serializers.ModelSerializer):
    completed_today = serializers.SerializerMethodField()
    completion_dates = serializers.SerializerMethodField()
    completion_rate = serializers.SerializerMethodField()
    current_streak = serializers.SerializerMethodField()
    best_streak = serializers.SerializerMethodField()
    completion_count = serializers.SerializerMethodField()

    class Meta:
        model = Habit
        fields = "__all__"
        read_only_fields = [
            "user",
            "created_at",
            "updated_at",
            "completed_today",
            "completion_dates",
            "completion_rate",
            "current_streak",
            "best_streak",
            "completion_count",
        ]

    def validate_title(self, value):
        if len(value.strip()) < 3:
            raise serializers.ValidationError(
                "Title must have at least 3 characters."
            )
        return value

    def validate_target_days(self, value):
        if value < 1:
            raise serializers.ValidationError(
                "Target days must be at least 1."
            )
        return value

    def get_completed_today(self, obj):
        return obj.completions.filter(
            completed_date=timezone.now().date()
        ).exists()

    def get_completion_dates(self, obj):
        return [
            completion.completed_date.isoformat()
            for completion in obj.completions.order_by("completed_date")
        ]

    def get_completion_count(self, obj):
        return obj.completions.count()

    def get_completion_rate(self, obj):
        if not obj.target_days:
            return 0

        rate = obj.completions.count() / obj.target_days * 100
        return min(round(rate, 2), 100)

    def get_current_streak(self, obj):
        current_streak, _ = calculate_streak(
            obj.completions.order_by("completed_date")
        )
        return current_streak

    def get_best_streak(self, obj):
        _, best_streak = calculate_streak(
            obj.completions.order_by("completed_date")
        )
        return best_streak


class HabitCompletionSerializer(serializers.ModelSerializer):
    habit_title = serializers.CharField(source="habit.title", read_only=True)
    habit_category = serializers.CharField(source="habit.category", read_only=True)

    class Meta:
        model = HabitCompletion
        fields = "__all__"
        read_only_fields = ["habit"]
    
    def validate_habit(self, value):
        """Ensure the habit belongs to the authenticated user."""
        user = self.context['request'].user
        if value.user != user:
            raise serializers.ValidationError("You can only complete your own habits.")
        return value
