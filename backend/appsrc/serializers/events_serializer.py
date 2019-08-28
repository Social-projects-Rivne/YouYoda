from rest_framework import serializers

from ..models import Events


class EventsTopSerializator(serializers.ModelSerializer):
	"""Takes data from the events model for latest events component.
    Converts it to JSON format for transmission via the API.

    """

	class Meta:

		 model = Events

		 fields = (
			"name", "description", "date", "cover_url", "location"
            )
