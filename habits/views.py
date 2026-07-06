from rest_framework import generics, permissions, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.utils import timezone
from django.db.models import Count

from .models import Habit, HabitCompletion
from .serializers import HabitSerializer, HabitCompletionSerializer
from .services import calculate_streak


class HabitListCreateView(generics.ListCreateAPIView):
    serializer_class = HabitSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [SearchFilter, OrderingFilter]
    search_fields = ["title", "category"]
    ordering_fields = ["created_at", "title", "target_days"]
    ordering = ["-created_at"]  # Default ordering

    def get_queryset(self):
        return Habit.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class HabitDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = HabitSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Habit.objects.filter(user=self.request.user)
    

class CompleteHabitView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        habit = get_object_or_404(
            Habit,
            pk=pk,
            user=request.user
        )

        today = timezone.now().date()

        completion, created = HabitCompletion.objects.get_or_create(
            habit=habit,
            completed_date=today
        )

        if not created:
            return Response(
                {"message": "Habit already completed today."},
                status=status.HTTP_400_BAD_REQUEST
            )

        return Response(
            {"message": "Habit marked as completed!"},
            status=status.HTTP_201_CREATED
        )


class HabitCompletionListCreateView(generics.ListCreateAPIView):
    serializer_class = HabitCompletionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Optional: filter by habit_pk if provided in URL
        habit_pk = self.kwargs.get('habit_pk')
        if habit_pk:
            return HabitCompletion.objects.filter(
                habit__user=self.request.user,
                habit_id=habit_pk
            )
        return HabitCompletion.objects.filter(habit__user=self.request.user)

    def perform_create(self, serializer):
        # Get habit from URL parameter
        habit_pk = self.kwargs.get('habit_pk')
        if habit_pk:
            habit = get_object_or_404(Habit, pk=habit_pk, user=self.request.user)
            serializer.save(habit=habit)
        else:
            serializer.save()


class HabitCompletionDetailView(generics.RetrieveDestroyAPIView):
    serializer_class = HabitCompletionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return HabitCompletion.objects.filter(habit__user=self.request.user)
    

class DashboardView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        today = timezone.now().date()

        habits = Habit.objects.filter(user=request.user)

        total_habits = habits.count()

        completed_today = HabitCompletion.objects.filter(
            habit__user=request.user,
            completed_date=today
        ).count()

        completion_rate = 0

        if total_habits:
            completion_rate = round(
                completed_today / total_habits * 100,
                2
            )

        completions = HabitCompletion.objects.filter(
            habit__user=request.user
        ).order_by("completed_date")

        current_streak, longest_streak = calculate_streak(completions)

        return Response({
            "total_habits": total_habits,
            "completed_today": completed_today,
            "completion_rate": completion_rate,
            "current_streak": current_streak,
            "longest_streak": longest_streak
        })