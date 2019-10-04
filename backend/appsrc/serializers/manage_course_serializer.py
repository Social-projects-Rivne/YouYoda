from rest_framework import serializers

from ..models import Courses


class ManageCourseSerializer(serializers.ModelSerializer):
    """Takes or updates data from the Course model for manage trainer courses.

    Converts it to JSON format for transmission via the API.
    """

    class Meta:

        model = Courses
        fields = ("__all__")

    def create(self, validated_data):
        """Create new course"""

        course = Courses.objects.create(
            coursename=validated_data.get('coursename'),
            owner=validated_data.get('owner'),
            status=validated_data.get('status'),
            description=validated_data.get('description'),
            is_public=validated_data.get('is_public'),
            start_date=validated_data.get('start_date'),
            duration=validated_data.get('duration'),
            cost=validated_data.get('cost'),
            members_limit=validated_data.get('members_limit'),
            categories=validated_data.get('categories'),
            location=validated_data.get('location'),
            cover_url=validated_data.get('cover_url')
        )

        course.save()
        return course

    def update(self, instance, validated_data):
        """Update existing course"""

        instance.coursename = validated_data.get('coursename', instance.coursename)
        instance.owner = validated_data.get('owner', instance.owner)
        instance.status = validated_data.get('status', instance.status)
        instance.description = validated_data.get('description', instance.description)
        instance.is_public = validated_data.get('is_public', instance.is_public)
        instance.start_date = validated_data.get('start_date', instance.start_date)
        instance.duration = validated_data.get('duration', instance.duration)
        instance.cost = validated_data.get('cost', instance.cost)
        instance.members_limit = validated_data.get('members_limit', instance.members_limit)
        instance.categories = validated_data.get('categories', instance.categories)
        instance.location = validated_data.get('location', instance.location)
        instance.cover_url = validated_data.get('cover_url', instance.cover_url)

        instance.save()
        return instance
