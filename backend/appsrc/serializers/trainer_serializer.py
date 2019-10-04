from rest_framework import serializers

from ..models import Courses, Events, TrainerCertificates, YouYodaUser
from .courses_serializer import TrainerIdSerializator


class TrainerInfoSerializer(serializers.ModelSerializer):
	"""Takes data from the YouYodaUser model for trainer page.
    Converts it to JSON format for transmission via the API.
    """

	class Meta:

		model = YouYodaUser
		fields = ("first_name", "last_name", "about_me", "phone_number",
					"avatar_url", "cover_url", "birth_date",
					"last_login", "location", "date_joined")


class TrainerCoursesSerializer(serializers.ModelSerializer):
	"""Takes data from the Courses model for trainer page.
    Converts it to JSON format for transmission via the API.
    """

	owner = TrainerIdSerializator()
	categories = serializers.StringRelatedField()
	class Meta:
		 model = Courses
		 fields = ("__all__")


class TrainerEventsSerializer(serializers.ModelSerializer):
	"""Takes data from the Events model for trainer page.
    Converts it to JSON format for transmission via the API.
    """

	owner = TrainerIdSerializator()
	categories = serializers.StringRelatedField()
	class Meta:
		 model = Events
		 fields = ("__all__")


class TrainerCertificatesSerializer(serializers.ModelSerializer):
	"""Takes data from the TrainerCertificates model for trainer page.
    Converts it to JSON format for transmission via the API.
    """

	class Meta:
		 model = TrainerCertificates
		 fields = ("description", "image_url")


class TopTrainerSerializer(serializers.ModelSerializer):
	"""Takes data from the YouYodaUser model for top trainer on home page.
    Converts it to JSON format for transmission via the API.
    """

	class Meta:
		 model = YouYodaUser
		 fields = ("id", "username", "first_name", "last_name", "avatar_url")
