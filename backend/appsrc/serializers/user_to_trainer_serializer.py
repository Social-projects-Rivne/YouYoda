from rest_framework import serializers
from django.utils import timezone

from ..models import YouYodaUser
from ..models import UserRequests


STATUS_NEW, STATUS_APPROVED, STATUS_REJECTED = 'N', 'A', 'R'

class UserToTrainerSerializer(serializers.ModelSerializer):
    """
    Takes or updates data from the YouYodaUser model for change user role.
    Converts it to JSON format for transmission via the API.
    """

    class Meta:

        model = YouYodaUser

        fields = (
            'is_trainer',
            )

        def update(self, instance, validated_data):
            """Update user role"""

            instance.is_trainer = validated_data.get('is_trainer', instance.is_trainer)
            instance.save()
            return instance

class UserRequestsSerializer(serializers.ModelSerializer):
    """
    Data adding to the UserRequests table for changing user role by moderator.
    """

    class Meta:
        model = UserRequests
        fields = ('author', 'date', 'status_code', 'comment')

        def create(self, validated_data):
            """Add request if it is not exist yet"""
            instance = UserRequests.objects.create(
                author_id = validated_data['author'],
                comment = '',
                status_code = validated_data['status_code'])
            instance.save()
            return instance
