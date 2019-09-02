from rest_framework import serializers

from ..models import Courses


class CoursesSerializator(serializers.ModelSerializer):
	"""Takes data from the Courses model for Top Courses component.
    Converts it to JSON format for transmission via the API.

    """
	owner = serializers.StringRelatedField()
	categories = serializers.StringRelatedField()


	class Meta:

		 model = Courses

		 fields = (
			"coursename", "description", "rate", "cover_url",
			"owner", "status", "is_public", "start_date",
			"duration", "cost", "members_limit", "categories", "location"
            )
