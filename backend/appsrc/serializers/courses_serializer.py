from rest_framework import serializers

from ..models import Courses, CoursesComments, CourseSchedule


class CoursesSerializator(serializers.ModelSerializer):
	"""Takes data from the Courses model for Top Courses component.
    Converts it to JSON format for transmission via the API.

    """
	owner = serializers.StringRelatedField()
	categories = serializers.StringRelatedField()


	class Meta:

		 model = Courses

		 fields = ('__all__')

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
		depth = 1
		fields = ("date", 'course')