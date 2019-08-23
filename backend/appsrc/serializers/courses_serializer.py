from rest_framework import serializers

from ..models import Courses


class CoursesTopSerializator(serializers.ModelSerializer):
	"""Takes data from the User model for view user profile.
    Converts it to JSON format for transmission via the API.

    """

	class Meta:

		 model = Courses

		 fields = (
			'coursename', "owner", "status", "description", "is_public", "start_date",
		 	"duration", "rate", "members_limit", "categories", "location", "cover_url" 
            )
