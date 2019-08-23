from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions

from ..models import Courses
from ..serializers.courses_serializer import CoursesTopSerializator


NUMBER_OF_TOP = 6

class TopCourses(APIView):
    """Takes data from CoursesTopSerializator for view user profile."""

    permission_classes = [permissions.AllowAny,]

    def get(self, request):
        """Receives and transmits user profile data"""
        courses = Courses.objects.order_by('rate')[:NUMBER_OF_TOP]
        serializer = CoursesTopSerializator(courses, many=True)
        return Response(serializer.data)

