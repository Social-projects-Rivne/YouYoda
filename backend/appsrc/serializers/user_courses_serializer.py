from rest_framework import serializers

from ..models import CoursesSubscribers, Courses


class UserCoursesSerializer(serializers.ModelSerializer):
    """Takes data from the Courses model for view information about user courses.

    Converts it to JSON format for transmission via the API.
    """

    owner = serializers.StringRelatedField()
    categories = serializers.StringRelatedField()

    class Meta:

        model = Courses
        exclude = ('id',)
