from django.contrib.auth.models import User
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from apps.habits.models import Habit, HabitCompletion


class HabitApiIntegrationTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username="api-user",
            email="api@example.com",
            password="test-password",
        )
        self.client.force_authenticate(user=self.user)

    def test_authenticated_user_can_create_and_complete_habit(self):
        create_response = self.client.post(
            reverse("habit-list"),
            {
                "title": "Morning walk",
                "description": "Walk before breakfast.",
                "category": "Health",
                "frequency": "Daily",
                "time_of_day": "Morning",
                "mood_tag": "Calm",
                "target_days": 14,
            },
            format="json",
        )

        self.assertEqual(
            create_response.status_code,
            status.HTTP_201_CREATED,
            create_response.data,
        )

        habit_id = create_response.data["id"]

        complete_response = self.client.post(
            reverse("habit-complete", args=[habit_id]),
            {},
            format="json",
        )

        self.assertEqual(
            complete_response.status_code,
            status.HTTP_201_CREATED,
            complete_response.data,
        )
        self.assertTrue(
            Habit.objects.filter(id=habit_id, user=self.user).exists()
        )
        self.assertTrue(
            HabitCompletion.objects.filter(habit_id=habit_id).exists()
        )

    def test_unauthenticated_user_cannot_create_habit(self):
        self.client.force_authenticate(user=None)

        response = self.client.post(
            reverse("habit-list"),
            {"title": "No auth habit"},
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
