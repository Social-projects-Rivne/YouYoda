from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from django.conf import settings
from django.core.cache.backends.base import DEFAULT_TIMEOUT
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page

from ..models import Events
from ..serializers.events_serializer import EventsTopSerializator


NUMBER_OF_TOP = 4
CACHE_TTL = getattr(settings, 'CACHE_TTL', DEFAULT_TIMEOUT)

class TopEvents(APIView):
    """Takes data from EventsTopSerializator for view latest events"""

    permission_classes = [permissions.AllowAny,]

    @method_decorator(cache_page(CACHE_TTL), name='top_events')
    def get(self, request):
        """First, check request data in cache, then pull data from db
            and set to cache"""
            events = Events.objects.order_by('-date')[:NUMBER_OF_TOP]
            serializer = EventsTopSerializator(events, many=True)
            return Response(serializer.data)
