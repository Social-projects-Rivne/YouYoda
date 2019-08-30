from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from django.conf import settings
from django.core.cache.backends.base import DEFAULT_TIMEOUT
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page

from ..models import Courses
from ..serializers.courses_serializer import CoursesSerializator


NUMBER_OF_TOP = 6
CACHE_TTL = getattr(settings, 'CACHE_TTL', DEFAULT_TIMEOUT)

class TopCourses(APIView):
    """Takes data from CoursesTopSerializator for view top rate courses"""

    permission_classes = [permissions.AllowAny,]

    @method_decorator(cache_page(CACHE_TTL), name='top_courses')
    def get(self, request):
        """First check request data in cache, then pull data from db"""
        courses = Courses.objects.order_by('-rate')[:NUMBER_OF_TOP]
        serializer = CoursesTopSerializator(courses, many=True)
        return Response(serializer.data)


class Pagination(APIView):
    

    permission_classes = [permissions.AllowAny,]

    @method_decorator(cache_page(CACHE_TTL), name='top_courses')
    def get(self, request):
        data_request=request.data['params']
        
        courses = Courses.objects.filter(
            coursename____icontains = data_request['coursename'], 
            is_public = data_request['is_public'],
             )
        serializer = CoursesTopSerializator(courses, many=True)
        return Response(serializer.data)