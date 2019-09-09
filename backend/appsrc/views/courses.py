from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from django.conf import settings
from django.core.cache.backends.base import DEFAULT_TIMEOUT
from django.core.paginator import Paginator
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page

from ..models import Courses, CoursesComments
from ..serializers.courses_serializer import CoursesSerializator, CCommentsSerializator


NUMBER_OF_TOP = 6
CACHE_TTL = getattr(settings, 'CACHE_TTL', DEFAULT_TIMEOUT)
COURSES_ON_PAGE = 6
SEARCH_FIELDS = ['status__in', 'coursename__icontains', 'rate__lte',
                 'rate__gte', 'location__icontains', 'categories__in',
                 'cost__gt', 'cost']

class TopCourses(APIView):
    """Takes data from CoursesTopSerializator for view top rate courses"""

    permission_classes = [permissions.AllowAny,]

    @method_decorator(cache_page(CACHE_TTL), name='top_courses')
    def get(self, request):
        """First check request data in cache, then pull data from db"""
        courses = Courses.objects.order_by('-rate')[:NUMBER_OF_TOP]
        serializer = CoursesSerializator(courses, many=True)
        return Response(serializer.data)


class SearchingCourses(APIView):
    """Filtering courses by different values and make pagination.
        Takes request data like SEARCH_FIELDS and params current page.
        Return number of pages and page of cours data """
    permission_classes = [permissions.AllowAny,]

    def post(self, request):

        data_filter=request.data
        page = request.query_params.get('page')
        courses = Courses.objects.all()

        for field in data_filter:
            if field and field in SEARCH_FIELDS and data_filter[field]:
                if field.endswith("__in"):
                    value = data_filter[field].strip().split(',')
                else:
                    value = data_filter[field]
                courses = courses.filter(**{field: value})

        courses= courses.order_by(data_filter['order_by'])

        serializer = CoursesSerializator(courses, many=True)
        pages = Paginator(serializer.data, COURSES_ON_PAGE)
        num_of_pages = pages.num_pages
        curent_page = pages.page(page).object_list
        response_data = {
            "num_of_pages":num_of_pages,
            "data":curent_page
        }
        return Response(response_data)


class CoursesComments(APIView):
    """Takes data from CoursesTopSerializator for view top rate courses"""

    permission_classes = [permissions.AllowAny,]

    @method_decorator(cache_page(CACHE_TTL), name='comments')
    def get(self, request):

        course_id = request.query_params.get('course_id')
        comments = CoursesComments.objects.filter(course = course_id)
        serializer = CCommentsSerializator(comments, many=True)
        return Response(serializer.data)

    def post(self, request):

        data_comment=request.data
        serializer = CCommentsSerializator(data=data_comment)

        if serializer.is_valid():
            comments = serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
