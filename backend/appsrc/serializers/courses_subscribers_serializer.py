from rest_framework import serializers

from ..models import CoursesSubscribers


class CoursesSubscribersPostSerializator(serializers.ModelSerializer):
	"""Takes data and add course, user to CoursesSubscribers.

    Converts it to JSON format for transmission via the API.
    """

	class Meta:
		model = CoursesSubscribers
		fields = (
			'participant', 'course'
            )

		def create(self, validated_data):
			course_add = CoursesSubscribers.objects.create(
					participant = validated_data['participant'],
					course = validated_data['course'],
					)
			course_add.save()
			return course_add


class CoursesSubscribersGetSerializator(serializers.ModelSerializer):
	"""Takes data about courses from CoursesSubscribers, Courses.

	Converts it to JSON format for transmission via the API.
	"""

	class Meta:
		model = CoursesSubscribers
		fields = ('course',)
