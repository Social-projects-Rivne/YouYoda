from rest_framework import serializers

from ..models import EventsSubscribers, Events


class UserEventsSerializer(serializers.ModelSerializer):
    """Takes data from the Events model for view information about user events.

    Converts it to JSON format for transmission via the API.
    """

    owner = serializers.StringRelatedField()
    categories = serializers.StringRelatedField()

    class Meta:
        model = Events
        exclude = ('id',)
