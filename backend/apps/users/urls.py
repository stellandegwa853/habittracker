from django.urls import path
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)
from .views import (
    ChangePasswordView,
    LoginView,
    ProfileView,
    RegisterView,
    UserPreferenceView,
)

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('refresh/', TokenRefreshView.as_view(), name='refresh'),
    path('profile/', ProfileView.as_view(), name='profile'),
    path('preferences/', UserPreferenceView.as_view(), name='preferences'),
    path('change-password/', ChangePasswordView.as_view(), name='change-password'),
]
