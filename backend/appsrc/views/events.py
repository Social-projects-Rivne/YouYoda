from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from django.conf import settings
from django.core.cache.backends.base import DEFAULT_TIMEOUT
from django.core.paginator import Paginator
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page

from ..models import Events
from ..serializers.events_serializer import EventsSerializator


NUMBER_OF_TOP = 4
CACHE_TTL = getattr(settings, 'CACHE_TTL', DEFAULT_TIMEOUT)
SEARCH_FIELDS = ['name__icontains', 'location__icontains', 'categories__in']
EVENTS_ON_PAGE = 4

class TopEvents(APIView):
    """Takes data from EventsSerializator for view latest events"""

    permission_classes = [permissions.AllowAny,]

    @method_decorator(cache_page(CACHE_TTL), name='top_events')
    def get(self, request):
        """First, check request data in cache, then pull data from db
            and set to cache"""
        events = Events.objects.order_by('-date')[:NUMBER_OF_TOP]
        serializer = EventsSerializator(events, many=True)
        return Response(serializer.data)


class SearchingEvents(APIView):
    """Filtering events by different values and make pagination.
        Takes request data like SEARCH_FIELDS and params current page.
        Return number of pages and page of event data """
    permission_classes = [permissions.AllowAny,]

    def post(self, request):

        data_filter=request.data
        page = request.query_params.get('page')
        events = Events.objects.all()

        for field in data_filter:
            if field and field in SEARCH_FIELDS and data_filter[field]:
                if field.endswith("__in"):
                    value = data_filter[field].strip().split(',')
                else:
                    value = data_filter[field]
                events = events.filter(**{field: value})

        events= events.order_by(data_filter['order_by'])

        serializer = EventsSerializator(events, many=True)
        pages = Paginator(serializer.data, EVENTS_ON_PAGE)
        num_of_pages = pages.num_pages
        curent_page = pages.page(page).object_list
        response_data = {
            "num_of_pages":num_of_pages,
            "data":curent_page
        }
        return Response(response_data)
