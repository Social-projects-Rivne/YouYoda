from ..models import YouYodaUser

from djoser.compat import get_user_email
from djoser.conf import settings
from rest_framework import serializers

class RegistrationSerializer(serializers.ModelSerializer):

    class Meta:
        model = YouYodaUser
        fields = ('username', 'password', 'email', 'is_trainer')

    def create(self, validated_data):
        user = YouYodaUser.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            is_trainer=validated_data['is_trainer'])
        user.set_password(validated_data['password'])
        user.save()

        return user
