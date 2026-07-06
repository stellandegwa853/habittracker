from rest_framework import serializers
from .models import Habit, HabitCompletion


class HabitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Habit
        fields = "__all__"
        read_only_fields = ["user", "created_at", "updated_at"]

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


class HabitCompletionSerializer(serializers.ModelSerializer):
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