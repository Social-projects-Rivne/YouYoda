from django.core import serializers
from rest_framework import permissions
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView


from ..models import YouYodaUser, Courses, Events, Achievements
from ..serializers.profile_view_serializer import ProfileViewSerializer
from ..serializers.user_courses_serializer import UserCoursesSerializer
from ..serializers.user_events_serializer import UserEventsSerializer
from ..serializers.user_achievements_serializer import UsersAchievementsSerializer


class ViewProfile(APIView):
    """Takes data from ProfileViewSerializer for view user profile."""

    permission_classes = [permissions.IsAuthenticated,]

    def get(self, request):
        """Receives and transmits user profile data"""
        user = YouYodaUser.objects.get(auth_token=request.headers['Authorization'].replace('Token ', ''))
        serializer = ProfileViewSerializer(user)
        return Response(serializer.data)


class ViewCoursesProfile(APIView):
    """Takes data from UserCoursesSerializer for view user courses."""

    permission_classes = [permissions.IsAuthenticated,]

    def get(self, request):
        """Receives and transmits user courses data"""
        user = YouYodaUser.objects.get(auth_token=request.headers['Authorization'].replace('Token ', ''))
        user_courses = Courses.objects.filter(subscribed_course__participant_id=user.id)
        courses_serializer = UserCoursesSerializer(user_courses, many=True)
        return Response(courses_serializer.data)


class ViewEventsProfile(APIView):
    """Takes data from UserEventsSerializer for view user events."""

    permission_classes = [permissions.IsAuthenticated,]

    def get(self, request):
        """Receives and transmits user courses data"""
        user = YouYodaUser.objects.get(auth_token=request.headers['Authorization'].replace('Token ', ''))
        user_events = Events.objects.filter(subscribed_event__participant_id=user.id)
        events_serializer = UserEventsSerializer(user_events, many=True)
        return Response(events_serializer.data)


class ViewAchievementsProfile(APIView):
    """Takes data from UsersAchievementsSerializer for view user achievements."""

    permission_classes = [permissions.IsAuthenticated,]

    def get(self, request):
        """Receives and transmits user courses data"""
        user = YouYodaUser.objects.get(auth_token=request.headers['Authorization'].replace('Token ', ''))
        user_achievements = Achievements.objects.filter(user_achievements__participant_id=user.id)
        achievement_serializer = UsersAchievementsSerializer(user_achievements, many=True)
        return Response(achievement_serializer.data)
