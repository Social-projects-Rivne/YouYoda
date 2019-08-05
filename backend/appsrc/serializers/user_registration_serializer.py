from ..models.user import User

from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework.authtoken.models import Token


User = get_user_model()

class RegistrationSerializer(serializers.ModelSerializer):

    class Meta:
    	model = User
    	fields = ('username', 'password', 'email', 'is_trainer')

    def create(self, validated_data):
        user = User.objects.create(username=validated_data['username'], email=validated_data['email'], is_trainer=validated_data['is_trainer'])
        user.set_password(validated_data['password'])
        user.save()

        return user
