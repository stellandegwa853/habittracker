from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase


class UserHabitFlowSystemTests(APITestCase):
    def test_user_can_register_login_create_complete_and_view_dashboard(self):
        register_response = self.client.post(
            reverse("register"),
            {
                "first_name": "Test",
                "last_name": "User",
                "username": "systemuser",
                "email": "system@example.com",
                "password": "test-password123",
            },
            format="json",
        )

        self.assertEqual(
            register_response.status_code,
            status.HTTP_201_CREATED,
            register_response.data,
        )

        login_response = self.client.post(
            reverse("login"),
            {
                "email": "system@example.com",
                "password": "test-password123",
            },
            format="json",
        )

        self.assertEqual(
            login_response.status_code,
            status.HTTP_200_OK,
            login_response.data,
        )
        self.assertIn("access", login_response.data)

        self.client.credentials(
            HTTP_AUTHORIZATION=f"Bearer {login_response.data['access']}"
        )

        habit_response = self.client.post(
            reverse("habit-list"),
            {
                "title": "Read daily",
                "description": "Read a few pages each evening.",
                "category": "Study",
                "frequency": "Daily",
                "time_of_day": "Evening",
                "mood_tag": "Focused",
                "target_days": 7,
            },
            format="json",
        )

        self.assertEqual(
            habit_response.status_code,
            status.HTTP_201_CREATED,
            habit_response.data,
        )

        complete_response = self.client.post(
            reverse("habit-complete", args=[habit_response.data["id"]]),
            {},
            format="json",
        )

        self.assertEqual(
            complete_response.status_code,
            status.HTTP_201_CREATED,
            complete_response.data,
        )

        dashboard_response = self.client.get(reverse("dashboard"))

        self.assertEqual(
            dashboard_response.status_code,
            status.HTTP_200_OK,
            dashboard_response.data,
        )
        self.assertEqual(dashboard_response.data["total_habits"], 1)
        self.assertEqual(dashboard_response.data["completed_today"], 1)
        self.assertEqual(dashboard_response.data["total_completed"], 1)
