from django.contrib.auth.models import User
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase


class HabitTrackingAcceptanceTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username="acceptance-user",
            email="acceptance@example.com",
            password="test-password",
        )
        self.client.force_authenticate(user=self.user)

    def get_response_items(self, response):
        if isinstance(response.data, dict) and "results" in response.data:
            return response.data["results"]

        return response.data

    def test_user_can_track_a_daily_habit_successfully(self):
        create_response = self.client.post(
            reverse("habit-list"),
            {
                "title": "Morning stretch",
                "description": "Stretch for a few minutes after waking up.",
                "category": "Fitness",
                "frequency": "Daily",
                "time_of_day": "Morning",
                "mood_tag": "Motivated",
                "target_days": 10,
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

        list_response = self.client.get(reverse("habit-list"))
        self.assertEqual(
            list_response.status_code,
            status.HTTP_200_OK,
            list_response.data,
        )

        habits = self.get_response_items(list_response)
        saved_habit = next(
            habit for habit in habits if habit["id"] == habit_id
        )

        self.assertEqual(saved_habit["title"], "Morning stretch")
        self.assertTrue(saved_habit["completed_today"])
        self.assertEqual(saved_habit["completion_count"], 1)
