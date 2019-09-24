from rest_framework import serializers

from ..models import EventsSubscribers, Events


class SubscribedSerializer(serializers.ModelSerializer):
    """Takes data from the EventsSubscribers model for view user events.

    Converts it to JSON format for transmission via the API.
    """

    class Meta:

        model = EventsSubscribers
        fields = ('completed',)


class UserEventsSerializer(serializers.ModelSerializer):
    """Takes data from the Events model for view information about user events.

    Converts it to JSON format for transmission via the API.
    """

    subscribed = SubscribedSerializer(source="subscribed_event", many="True")
    owner = serializers.StringRelatedField()
    categories = serializers.StringRelatedField()

    class Meta:
        model = Events
        fields = ("__all__")#exclude = ('id',)
