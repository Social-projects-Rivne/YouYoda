from rest_framework import serializers

from ..models import YouYodaUser, Courses, Events, TrainerCertificates


class TrainerInfoSerializer(serializers.ModelSerializer):
	"""Takes data from the YouYodaUser model for trainer page.
    Converts it to JSON format for transmission via the API.

    """

	class Meta:

		 model = YouYodaUser
		 fields = (
			 		"first_name", "last_name", "about_me", "phone_number",
					"avatar_url", "cover_url")


class TrainerCoursesSerializer(serializers.ModelSerializer):
	"""Takes data from the Courses model for trainer page.
    Converts it to JSON format for transmission via the API.

    """

	class Meta:

		 model = Courses
		 fields = ("__all__")


class TrainerEventsSerializer(serializers.ModelSerializer):
	"""Takes data from the Events model for trainer page.
    Converts it to JSON format for transmission via the API.

    """

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