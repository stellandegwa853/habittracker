from django.db import models
from django.contrib.auth.models import User


class Habit(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='habits'
    )

    title = models.CharField(max_length=100)

    description = models.TextField(blank=True)

    category = models.CharField(
        max_length=50,
        blank=True
    )

    frequency = models.CharField(
        max_length=50,
        default='Daily'
    )

    time_of_day = models.CharField(
        max_length=50,
        default='Morning'
    )

    goal = models.CharField(
        max_length=100,
        blank=True
    )

    reminder_time = models.TimeField(
        null=True,
        blank=True
    )

    start_date = models.DateField(
        null=True,
        blank=True
    )

    mood_tag = models.CharField(
        max_length=50,
        default='Calm'
    )

    color = models.CharField(
        max_length=50,
        blank=True,
        default='coffee'
    )

    target_days = models.PositiveIntegerField(default=30)

    created_at = models.DateTimeField(auto_now_add=True)

    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
    
class HabitCompletion(models.Model):
    habit = models.ForeignKey(
        Habit,
        on_delete=models.CASCADE,
        related_name='completions'
    )

    completed_date = models.DateField()

    class Meta:
        unique_together = ('habit', 'completed_date')

    def __str__(self):
        return f"{self.habit.title} - {self.completed_date}"
