from rest_framework import serializers

from ..models import CoursesSubscribers, Courses


class SubscribedSerializer(serializers.ModelSerializer):
    """Takes data from the CoursesSubscribers model for view user courses.

    Converts it to JSON format for transmission via the API.
    """

    class Meta:

        model = CoursesSubscribers
        fields = ('completed', 'rate', 'is_favourite',)


class UserCoursesSerializer(serializers.ModelSerializer):
    """Takes data from the Courses model for view information about user courses.

    Converts it to JSON format for transmission via the API.
    """

    subscribed = SubscribedSerializer(source="subscribed_course", many="True")
    owner = serializers.StringRelatedField()
    categories = serializers.StringRelatedField()

    class Meta:

        model = Courses
        fields = ("__all__")#exclude = ('id',)
