from rest_framework import serializers

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
					participant_id = validated_data['participant_id'],
					event_id = validated_data['event_id'],
					)
			event_add.save()
			return event_add


class EventsSubscribersGetSerializator(serializers.ModelSerializer):
	"""Takes data about events from EventsSubscribers, Events.

    Converts it to JSON format for transmission via the API.
    """

	class Meta:
		model = EventsSubscribers
		depth = 1
		fields = ('event_id',)

		