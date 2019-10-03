from rest_framework import serializers

from ..models import YouYodaUser


class LastSeenSerializator(serializers.ModelSerializer):
    """Takes or updates data from the User model for fill/edit user profile.

    Converts it to JSON format for transmission via the API.

    """

    class Meta:

        model = YouYodaUser
        fields = ('last_seen', )

    def update(self, instance, validated_data):
        """Update user last_seen"""
        instance.last_seen = validated_data.get('last_seen', instance.last_seen)
        instance.save()
        return instance
