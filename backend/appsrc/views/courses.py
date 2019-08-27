from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from django.core.cache import cache
from django.conf import settings
from django.core.cache.backends.base import DEFAULT_TIMEOUT

from ..models import Courses
from ..serializers.courses_serializer import CoursesTopSerializator


NUMBER_OF_TOP = 6
CACHE_TTL = getattr(settings, 'CACHE_TTL', DEFAULT_TIMEOUT)

class TopCourses(APIView):
    """Takes data from CoursesTopSerializator for view user profile."""

    permission_classes = [permissions.AllowAny,]

    def get(self, request):
        """Receives and transmits user profile data"""
        if 'top_courses' in cache:
            # get results from cache
            top_courses = cache.get('top_courses')
            return Response(top_courses.data)
        else:
            courses = Courses.objects.order_by('rate')[:NUMBER_OF_TOP]
            serializer = CoursesTopSerializator(courses, many=True)
            # store data in cache
            cache.set(top_courses, serializer, timeout=CACHE_TTL)
            return Response(serializer.data)
