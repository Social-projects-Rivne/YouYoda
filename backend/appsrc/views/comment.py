from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status
from django.conf import settings
from django.core.cache.backends.base import DEFAULT_TIMEOUT
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page

from ..models import CoursesComments, YouYodaUser, EventsComments
from ..serializers.comment_serializer import CourseCommentsGetSerializator, CourseCommentsPostSerializator, EventCommentsGetSerializator, EventCommentsPostSerializator


CACHE_TTL = getattr(settings, 'CACHE_TTL', DEFAULT_TIMEOUT)

class CourseComments(APIView):
    """Takes data from CoursesSerializator for view top rate courses"""

    permission_classes = [permissions.AllowAny,]

    def get(self, request):
        """Get course_id as params and filter comments"""
        course_id = request.query_params.get('course_id')
        comments = CoursesComments.objects.filter(course = course_id).order_by('-date')
        serializer = CourseCommentsGetSerializator(comments, many=True)
        return Response(serializer.data)

    def post(self, request):
        """Push comment to db with CommentsPostSerializator"""
        data_comment=request.data
        user = YouYodaUser.objects.get(auth_token=request.headers['Authorization'].replace('Token ', ''))
        data_comment['author'] = user.id
        serializer = CourseCommentsPostSerializator(data=data_comment)

        if serializer.is_valid():
            comments = serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class EventComments(APIView):
    """Takes data from EventsSerializator for view top rate courses"""

    permission_classes = [permissions.AllowAny,]

    def get(self, request):
        """Get event_id as params and filter comments"""
        event_id = request.query_params.get('event_id')
        comments = EventsComments.objects.filter(event = event_id).order_by('-date')
        serializer = EventCommentsGetSerializator(comments, many=True)
        return Response(serializer.data)

    def post(self, request):
        """Push comment to db with CommentsPostSerializator"""
        data_comment=request.data
        user = YouYodaUser.objects.get(auth_token=request.headers['Authorization'].replace('Token ', ''))
        data_comment['author'] = user.id
        serializer = EventCommentsPostSerializator(data=data_comment)

        if serializer.is_valid():
            comments = serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TrainerComments(APIView):
    """Takes data from TrainerSerializator for view top rate courses"""

    permission_classes = [permissions.AllowAny,]

    def get(self, request):
        """Get trainer_id as params and filter comments"""
        trainer_id = request.query_params.get('trainer_id')
        comments = TrainerComments.objects.filter(trainer = trainer_id).order_by('-date')
        serializer = TrainerCommentsGetSerializator(comments, many=True)
        return Response(serializer.data)

    def post(self, request):
        """Push comment to db with CommentsPostSerializator"""
        data_comment=request.data
        user = YouYodaUser.objects.get(auth_token=request.headers['Authorization'].replace('Token ', ''))
        data_comment['author'] = user.id
        serializer = TrainerCommentsPostSerializator(data=data_comment)

        if serializer.is_valid():
            comments = serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)