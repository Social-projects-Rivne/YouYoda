from rest_framework.views import APIView
from django.core import serializers
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from ..models import YouYodaUser, CoursesSubscribers, Courses
from ..serializers.profile_view_serializer import ProfileViewSerializer
from ..serializers.user_courses_serializer import UserCoursesSerializer


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
