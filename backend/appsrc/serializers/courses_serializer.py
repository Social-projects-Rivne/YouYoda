from rest_framework import serializers

from ..models import Courses, CoursesComments, CourseSchedule, YouYodaUser


class TrainerIdSerializator(serializers.ModelSerializer):
	"""Takes id, first_name and last_name from the YouYodaUser model"""

	class Meta:

		 model = YouYodaUser
		 fields = ('id', 'first_name', 'last_name')

class CoursesSerializator(serializers.ModelSerializer):
	"""Takes data from the Courses model for Top Courses component.
    Converts it to JSON format for transmission via the API.

    """

	categories = serializers.StringRelatedField()
	owner = TrainerIdSerializator()

	class Meta:

		 model = Courses

		 fields = ('coursename', 'owner', 'status', 'description', 'is_public',
		  			'start_date', 'duration', 'rate', 'cost', 'members_limit',
					'categories', 'location', 'cover_url', 'id')

class CCommentsSerializator(serializers.ModelSerializer):
	"""Takes data from the CoursesComponents model for create list of comments.
    Converts it to JSON format for transmission via the API.
	"""

	author = serializers.StringRelatedField()

	class Meta:

		model = CoursesComments

		fields = (
			'author', 'course', 'date',	'comment'
            )

		def create(self, validated_data):
			comments = CoursesComments.objects.create(
				author=validated_data['author'],
				comment=validated_data['comment']
				)
			comments.save()

			return comments

class CourseScheduleSerializer(serializers.ModelSerializer):
	"""Takes data from the categories model for categories list component.
    Converts it to JSON format for transmission via the API.
    """

	class Meta:

		model = CourseSchedule
		fields = ('date', 'course')
