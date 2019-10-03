from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status

from ..models import EventsSubscribers, YouYodaUser, Events
from ..serializers.events_subscribers_serializer import (
                                        EventsSubscribersPostSerializator, 
                                        EventsSubscribersGetSerializator)


class UserSubscribeToEvent(APIView):
    """Takes data from EventsSubscribersPostSerializator for add user to event"""

    permission_classes = [permissions.IsAuthenticated,]

    def post(self, request):
        """Push user, event to db with EventsSubscribersPostSerializator"""
        data_event=request.data
        auth_token = request.headers['Authorization'][6:]
        user = YouYodaUser.objects.get(auth_token=auth_token)
        event = Events.objects.get(id = data_event['event_id'])
        data_event['participant'] = user.id
        data_event['event'] = event.id
        event_add = EventsSubscribers.objects.filter(
                            participant = data_event['participant'], 
                            event = data_event['event'])

        if event_add:
            msg = "You have already subscribed to this event!"
            return Response(msg, status=status.HTTP_208_ALREADY_REPORTED)
        else:
            serializer = EventsSubscribersPostSerializator(data=data_event)
            if serializer.is_valid():
                event_add = serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        """Receives and transmits user event data"""
        auth_token = request.headers['Authorization'][6:]
        user = YouYodaUser.objects.get(auth_token=auth_token)
        events = EventsSubscribers.objects.filter(participant = user.id)
        serializer = EventsSubscribersGetSerializator(events, many=True)
        return Response(serializer.data)

        