from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from django.conf import settings
from django.core.cache.backends.base import DEFAULT_TIMEOUT
from django.core.paginator import Paginator
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page

from ..models import Courses
from ..serializers.courses_serializer import CoursesSerializator
from ..filter import CoursesFilter

NUMBER_OF_TOP = 6
CACHE_TTL = getattr(settings, 'CACHE_TTL', DEFAULT_TIMEOUT)
PAGE_NUMBER = 1
COURSES_ON_PAGE = 4

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

    permission_classes = [permissions.AllowAny,]

    def get(self, request):

        data_filter=request.query_params
        page = request.query_params.get('page')
        regex_name = data_filter.get('coursename')
        regex_location = data_filter.get('location')

        # for field in data_filter:
        #     if field:
        #         courses = Courses.objects.filter(field=data_filter[field])


        f = CoursesFilter(request.GET, queryset=Courses.objects.filter(
                coursename__regex = r'(?i){name}'.format(name=regex_name),
                location__regex=r'(?i){location}'.format(location=regex_location)
            ))

        # courses = Courses.objects

        #     coursename__regex = r'(?i){name}'.format(name=regex_name),
        #     rate__gte=data_filter.get('rate'),
        #     status=data_filter.get('status'),
        #     categories=data_filter.get('categories'),
        #     cost__gte=data_filter.get('cost_gte'),
        #     cost__lte=data_filter.get('cost_lte')
        #     ).order_by(
        #         data_filter.get('sort_rate'),
        #         data_filter.get('sort_duration'),
        #         data_filter.get('sort_start_date'),
        #         data_filter.get('sort_cost')

        #     )
        serializer = CoursesSerializator(f.qs, many=True)
        pages = Paginator(serializer.data, COURSES_ON_PAGE)
        num_of_pages = pages.num_pages
        curent_page = pages.page(page).object_list
        response_data = {
            "num_of_pages":num_of_pages,
            "data":curent_page
        }
        return Response(response_data)
