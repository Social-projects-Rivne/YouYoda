from rest_framework import serializers

from ..models import Events
from .courses_serializer import TrainerIdSerializator


class EventsSerializator(serializers.ModelSerializer):
	"""Takes data from the events model for latest events component.
    Converts it to JSON format for transmission via the API.

    """
	owner = TrainerIdSerializator()
	categories = serializers.StringRelatedField()

	class Meta:
		 model = Events
		 fields = ("__all__")
