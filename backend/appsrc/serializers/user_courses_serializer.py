from rest_framework import serializers

from .courses_serializer import TrainerIdSerializator
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
    owner = TrainerIdSerializator()
    categories = serializers.StringRelatedField()

    class Meta:

        model = Courses
        fields = ("__all__")
