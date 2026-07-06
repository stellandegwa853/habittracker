from rest_framework import generics
from django.contrib.auth.models import User
from .models import UserPreference
from .serializers import (
    ChangePasswordSerializer,
    EmailLoginSerializer,
    ProfileSerializer,
    RegisterSerializer,
    UserPreferenceSerializer,
)
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from habits.models import Habit, HabitCompletion


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]


class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = EmailLoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.validated_data)


class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        total_habits = Habit.objects.filter(user=request.user).count()
        total_completed = HabitCompletion.objects.filter(
            habit__user=request.user
        ).count()

        return Response({
            "id": request.user.id,
            "first_name": request.user.first_name,
            "last_name": request.user.last_name,
            "username": request.user.username,
            "email": request.user.email,
            "date_joined": request.user.date_joined,
            "total_habits": total_habits,
            "total_completed": total_completed
        })

    def patch(self, request):
        serializer = ProfileSerializer(
            request.user,
            data=request.data,
            partial=True
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return self.get(request)


class UserPreferenceView(APIView):
    permission_classes = [IsAuthenticated]

    def get_preferences(self, user):
        preferences, _ = UserPreference.objects.get_or_create(user=user)
        return preferences

    def get(self, request):
        serializer = UserPreferenceSerializer(
            self.get_preferences(request.user)
        )
        return Response(serializer.data)

    def patch(self, request):
        preferences = self.get_preferences(request.user)
        serializer = UserPreferenceSerializer(
            preferences,
            data=request.data,
            partial=True
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class ChangePasswordView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = ChangePasswordSerializer(
            data=request.data,
            context={'request': request}
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'message': 'Password updated successfully.'})
