from django.contrib import admin
from .models import Habit, HabitCompletion


@admin.register(Habit)
class HabitAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "user",
        "category",
        "frequency",
        "time_of_day",
        "target_days",
        "created_at",
    )
    search_fields = (
        "title",
        "category",
    )
    list_filter = (
        "category",
        "frequency",
        "time_of_day",
        "created_at",
    )
    readonly_fields = ("created_at", "updated_at")


@admin.register(HabitCompletion)
class HabitCompletionAdmin(admin.ModelAdmin):
    list_display = (
        "habit",
        "completed_date",
    )
    search_fields = (
        "habit__title",
    )
    list_filter = (
        "completed_date",
    )
