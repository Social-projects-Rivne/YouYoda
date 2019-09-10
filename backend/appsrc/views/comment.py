from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status
from django.conf import settings
from django.core.cache.backends.base import DEFAULT_TIMEOUT
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page

from ..models import CoursesComments
from ..serializers.comment_serializer import CommentsGetSerializator, CommentsPostSerializator


CACHE_TTL = getattr(settings, 'CACHE_TTL', DEFAULT_TIMEOUT)

class CourseComments(APIView):
    """Takes data from CoursesTopSerializator for view top rate courses"""

    permission_classes = [permissions.AllowAny,]

    # @method_decorator(cache_page(CACHE_TTL), name='comments')
    def get(self, request):

        course_id = request.query_params.get('course_id')
        comments = CoursesComments.objects.filter(course = course_id)
        serializer = CommentsGetSerializator(comments, many=True)
        return Response(serializer.data)

    def post(self, request):

        data_comment=request.data
        serializer = CommentsPostSerializator(data=data_comment)

        if serializer.is_valid():
            comments = serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
