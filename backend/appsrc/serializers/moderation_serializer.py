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

class ManageUserDataSerializer(serializers.Serializer):
    """
    Takes or updates data from the YouYodaUser model for change user data.
    Converts it to JSON format for transmission via the API.
    """
    hide_my_data = serializers.BooleanField()
    first_name = serializers.CharField()
    last_name = serializers.CharField()
    username = serializers.CharField()
    phone_number = serializers.CharField()
    is_trainer = serializers.BooleanField()
    is_active = serializers.BooleanField()
    
    def update(self, instance, validated_data):
        """Updating user data"""

        instance.hide_my_data = validated_data.get('hide_my_data', instance.hide_my_data)
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.username = validated_data.get('username', instance.username)
        instance.phone_number = validated_data.get('phone_number', instance.phone_number)
        instance.is_trainer = validated_data.get('is_trainer', instance.is_trainer)
        instance.is_active = validated_data.get('is_active', instance.is_active)
        instance.save()
        return instance