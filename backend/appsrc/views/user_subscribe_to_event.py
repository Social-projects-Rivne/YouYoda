from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status

from ..models import EventsSubscribers, YouYodaUser, Events
from ..serializers.events_subscribers_serializer import EventsSubscribersSerializator


class UserSubscribeToEvent(APIView):
    """Takes data from EventsSubscribersSerializator for add user to event"""

    permission_classes = [permissions.IsAuthenticated,]

    def post(self, request):
        """Push user, event to db with EventsSubscribersSerializator"""
        data_event=request.data
        auth_token = request.headers['Authorization'].replace('Token ', '')
        user = YouYodaUser.objects.get(auth_token=auth_token)
        event = Events.objects.get(id = data_event['event_id'])
        data_event['participant_id'] = user.id
        data_event['event_id'] = event.id
        event_add = EventsSubscribers.objects.filter(
                            participant_id = data_event['participant_id'], 
                            event_id = data_event['event_id'])

        if event_add:
            msg = "You have already subscribed to this event!"
            return Response(msg, status=status.HTTP_208_ALREADY_REPORTED)
        else:
            serializer = EventsSubscribersSerializator(data=data_event)
            if serializer.is_valid():
                event_add = serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
