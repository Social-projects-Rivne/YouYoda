from rest_framework import serializers

from djoser.conf import settings

from ..models import YouYodaUser


class ChangePasswordSerializer(serializers.ModelSerializer):
    """Updates password from the User model for fill/edit user profile.

    Converts it to JSON format for transmission via the API.

    """

    class Meta:

        model = YouYodaUser

        fields = ('password')

    def update(self, instance, validated_data):
        """Update user password"""

        instance.set_password(validated_data['password'])
        instance.save()
        return instance
