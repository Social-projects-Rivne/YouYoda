from ..models import YouYodaUser
from .user_serializer import UserSerializer

from rest_framework import serializers


class ManageUsersStatusesSerializer(serializers.Serializer):
    """
    Takes or updates data from the YouYodaUser model for change user role.
    Converts it to JSON format for transmission via the API.
    """
    status_id = serializers.IntegerField()
    
    def update(self, instance, validated_data):
        """Updating users' statuses"""

        instance.status_id = validated_data.get('status_id', instance.status_id)
        instance.save()
        return instance
