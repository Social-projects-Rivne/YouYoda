from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status
from django.conf import settings
from django.core.cache.backends.base import DEFAULT_TIMEOUT
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from django.views.decorators.vary import vary_on_headers

from ..models import CoursesSubscribers, YouYodaUser, Courses, CourseSchedule
from ..serializers.courses_subscribers_serializer import CoursesSubscribersPostSerializator
from ..serializers.courses_serializer import CourseScheduleSerializer


CACHE_TTL = getattr(settings, 'CACHE_TTL', DEFAULT_TIMEOUT)

class UserSubscribeToCourse(APIView):
    """Takes data from CoursesSubscribersPostSerializator for add user to course"""

    permission_classes = [permissions.IsAuthenticated,]

    def post(self, request):
        """Push user, course to db with CoursesSubscribersPostSerializator"""
        data_course=request.data
        auth_token = request.headers['Authorization'][6:]
        user = YouYodaUser.objects.get(auth_token=auth_token)
        course = Courses.objects.get(id = data_course['course_id'])
        data_course['participant'] = user.id
        data_course['course'] = course.id
        course_add = CoursesSubscribers.objects.filter(
                            participant = data_course['participant'],
                            course = data_course['course'])

        if course_add:
            msg = "You have already subscribed to this course!"
            return Response(msg, status=status.HTTP_208_ALREADY_REPORTED)
        else:
            serializer = CoursesSubscribersPostSerializator(data=data_course)
            if serializer.is_valid():
                course_add = serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # @method_decorator(cache_page(CACHE_TTL), name='subscribe-course')
    # @vary_on_headers('Authorization')
    def get(self, request):
        """Receives and transmits user course data and schedule data about these courses"""
        auth_token = request.headers['Authorization'][6:]
        user = YouYodaUser.objects.get(auth_token=auth_token)
        user_courses = CoursesSubscribers.objects.filter(participant = user.id)
        list_id_courses = []
        for user_course in user_courses:
            list_id_courses.append(user_course.course)
        schedule_courses = CourseSchedule.objects.filter(course__in = list_id_courses).order_by('date')
        serializer = CourseScheduleSerializer(schedule_courses, many=True)
       
        return Response(serializer.data)