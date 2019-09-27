from rest_framework import serializers

from ..models import CoursesSubscribers


class CoursesSubscribersSerializator(serializers.ModelSerializer):
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


class FavoriteCoursesSerializator(serializers.ModelSerializer):
    """ """

    class Meta:
        model = CoursesSubscribers
        fields = (
            'is_favourite',
        )

        def update(self, instance, validated_data):
            instance.is_favourite = validated_data.get('is_favourite', instance.is_favourite)
            instance.save()
            return instance

