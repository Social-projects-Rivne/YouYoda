from rest_framework import serializers

from ..models import Events


class EventsSerializator(serializers.ModelSerializer):
	"""Takes data from the events model for latest events component.
    Converts it to JSON format for transmission via the API.

    """
	owner = serializers.StringRelatedField()
	categories = serializers.StringRelatedField()

	class Meta:

		 model = Events

		 fields = (
			"name", "description", "date", "cover_url", "location",
			"categories", "owner"
            )
