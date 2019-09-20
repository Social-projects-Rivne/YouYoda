from rest_framework import serializers

from ..models import CoursesSubscribers


class CoursesSubscribersSerializator(serializers.Serializer):
	"""Takes data and add course, user to CoursesSubscribers.

    Converts it to JSON format for transmission via the API.
    """
	participant_id = serializers.IntegerField()
	course_id = serializers.IntegerField()

	def create(self, validated_data):
		course_add = CoursesSubscribers.objects.create(
				participant_id = validated_data['participant_id'],
				course_id = validated_data['course_id'],
				)
		course_add.save()
		return course_add

