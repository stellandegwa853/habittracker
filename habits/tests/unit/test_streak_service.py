from datetime import date

from django.contrib.auth.models import User
from django.test import TestCase

from habits.models import Habit, HabitCompletion
from habits.services import calculate_streak


class StreakServiceTests(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username="streak-user",
            password="test-password",
        )
        self.habit = Habit.objects.create(
            user=self.user,
            title="Read daily",
        )

    def add_completion(self, completed_date):
        HabitCompletion.objects.create(
            habit=self.habit,
            completed_date=completed_date,
        )

    def test_calculate_streak_counts_consecutive_days(self):
        self.add_completion(date(2026, 7, 1))
        self.add_completion(date(2026, 7, 2))
        self.add_completion(date(2026, 7, 3))

        current_streak, best_streak = calculate_streak(
            self.habit.completions.order_by("completed_date")
        )

        self.assertEqual(current_streak, 3)
        self.assertEqual(best_streak, 3)

    def test_calculate_streak_resets_after_gap(self):
        self.add_completion(date(2026, 7, 1))
        self.add_completion(date(2026, 7, 3))
        self.add_completion(date(2026, 7, 4))

        current_streak, best_streak = calculate_streak(
            self.habit.completions.order_by("completed_date")
        )

        self.assertEqual(current_streak, 2)
        self.assertEqual(best_streak, 2)
