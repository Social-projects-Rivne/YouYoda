from rest_framework import serializers

from ..models import CoursesSubscribers


class CoursesSubscribersPostSerializator(serializers.Serializer):
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
        return course_add


class CoursesSubscribersGetSerializator(serializers.ModelSerializer):
    """Takes data about courses from CoursesSubscribers, Courses.

    Converts it to JSON format for transmission via the API.
    """

    class Meta:
        model = CoursesSubscribers
        fields = ('course',)


class FavoriteCoursesSerializator(serializers.ModelSerializer):
    """Add or remove course to favorites list table"""

    class Meta:
        model = CoursesSubscribers
        fields = (
            'is_favourite',
        )

        def update(self, instance, validated_data):
            instance.is_favourite = validated_data.get('is_favourite', instance.is_favourite)
            instance.save()
            return instance
