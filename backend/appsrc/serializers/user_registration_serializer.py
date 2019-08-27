from djoser.compat import get_user_email
from djoser.conf import settings
from rest_framework import serializers

from ..models import YouYodaUser
from ..generate_password import generate_password


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


class SocialRegistrationSerializer(serializers.ModelSerializer):

    class Meta:
        model = YouYodaUser
        fields = ('username', 'email', 'is_trainer', 'first_name', 'last_name')

    def create(self, validated_data):
        user = YouYodaUser.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            is_trainer=validated_data['is_trainer'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'])
        user.set_password(generate_password())
        user.save()

        return user
