from rest_framework import serializers

from ..models import CoursesSubscribers, Courses


class SubscribedSerializer(serializers.ModelSerializer):
    """Takes data from the CoursesSubscribers model for view user courses.

    Converts it to JSON format for transmission via the API.
    """

    class Meta:

        model = CoursesSubscribers
        fields = ('completed','feedback','rate', 'is_favourite')


class UserCoursesSerializer(serializers.ModelSerializer):

	subscribed = SubscribedSerializer(source="subscribed_course", many="True")
	owner = serializers.StringRelatedField()
	categories = serializers.StringRelatedField()

	class Meta:

		 model = Courses
		 exclude = ('id',)
