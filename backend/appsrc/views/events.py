from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from django.core.cache import cache
from django.conf import settings
from django.core.cache.backends.base import DEFAULT_TIMEOUT

from ..models import Events
from ..serializers.events_serializer import EventsTopSerializator


NUMBER_OF_TOP = 4
CACHE_TTL = getattr(settings, 'CACHE_TTL', DEFAULT_TIMEOUT)

class TopEvents(APIView):
    """Takes data from EventsTopSerializator for view latest events"""

    permission_classes = [permissions.AllowAny,]

    def get(self, request):
        """First, check request data in cache, then pull data from db
            and set to cache"""
        if 'top_events' in cache:
            # get results from cache
            top_event = cache.get('top_events')
            return Response(top_event)
        else:
            events = Events.objects.order_by('-date')[:NUMBER_OF_TOP]
            serializer = EventsTopSerializator(events, many=True)
            # store data in cache
            cache.set('top_events', serializer.data, timeout=CACHE_TTL)
            return Response(serializer.data)
