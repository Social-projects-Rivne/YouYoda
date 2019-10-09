from rest_framework import serializers

from .events_serializer import EventsSerializator
from ..models import EventsSubscribers


class EventsSubscribersPostSerializator(serializers.ModelSerializer):
	"""Takes data and add event, user to EventsSubscribers.

    Converts it to JSON format for transmission via the API.
    """

	class Meta:
		model = EventsSubscribers
		fields = ('__all__')

		def create(self, validated_data):
			event_add = EventsSubscribers.objects.create(
					participant = validated_data['participant'],
					event = validated_data['event'],
					)
			return event_add


class EventsSubscribersGetSerializator(serializers.ModelSerializer):
	"""Takes data about events from EventsSubscribers, Events.

    Converts it to JSON format for transmission via the API.
    """

	event = EventsSerializator()
	class Meta:
		model = EventsSubscribers
		fields = ('event',)
