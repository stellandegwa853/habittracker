from django.urls import path
from .views import (
    DashboardView,
    HabitListCreateView, 
    HabitDetailView,
    HabitCompletionListCreateView,
    HabitCompletionDetailView,
    CompleteHabitView
)


urlpatterns = [
    # Dashboard
    path("dashboard/", DashboardView.as_view(), name="dashboard"),
    
    # Habit endpoints
    path("", HabitListCreateView.as_view(), name="habit-list"),
    path("<int:pk>/", HabitDetailView.as_view(), name="habit-detail"),
    path("<int:pk>/complete/", CompleteHabitView.as_view(), name="habit-complete"),
    
    # Habit completion endpoints
    path("<int:habit_pk>/completions/", HabitCompletionListCreateView.as_view(), name="completion-list"),
    path("completions/<int:pk>/", HabitCompletionDetailView.as_view(), name="completion-detail"),
]