from rest_framework import serializers

from ..models import CoursesSubscribers


class CoursesSubscribersSerializator(serializers.ModelSerializer):
	"""Takes data and add course, user to CoursesSubscribers.

    Converts it to JSON format for transmission via the API.
    """

	class Meta:
		model = CoursesSubscribers
		fields = (
			'participant_id', 'course_id'
            )

		def create(self, validated_data):
			course_add = CoursesSubscribers.objects.create(
					participant_id = validated_data['participant_id'],
					course_id = validated_data['course_id'],
					)
			course_add.save()
			return course_add


