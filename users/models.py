from django.conf import settings
from django.db import models


class UserPreference(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='preferences'
    )
    reminder_enabled = models.BooleanField(default=True)
    daily_notification_time = models.TimeField(null=True, blank=True)
    dark_mode = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.user.username} preferences"
