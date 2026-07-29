from django.contrib.auth.models import User
from django.test import TestCase

from habits.models import Habit
from habits.serializers import HabitSerializer


class HabitGoalValidationTests(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username="william",
            password="test-password",
        )

    def test_time_based_goal_requires_duration(self):
        serializer = HabitSerializer(data={
            "title": "Read book",
            "goal_type": Habit.GOAL_TIME,
            "timer_enabled": True,
        })

        self.assertFalse(serializer.is_valid())
        self.assertIn("target_duration_seconds", serializer.errors)

    def test_simple_goal_clears_timer_fields(self):
        serializer = HabitSerializer(data={
            "title": "Drink water",
            "goal_type": Habit.GOAL_SIMPLE,
            "target_duration_seconds": 600,
            "timer_enabled": True,
        })

        self.assertTrue(serializer.is_valid(), serializer.errors)
        habit = serializer.save(user=self.user)

        self.assertEqual(habit.goal_type, Habit.GOAL_SIMPLE)
        self.assertIsNone(habit.target_duration_seconds)
        self.assertFalse(habit.timer_enabled)
