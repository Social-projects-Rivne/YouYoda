from ..models.user import User

import bcrypt
from rest_framework import serializers


class RegistrationSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('username', 'password', 'psalt', 'email', 'is_trainer')

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            psalt=bcrypt.gensalt(12),
            password=bcrypt.hashpw(validated_data['password'].encode(encoding='UTF-8'), psalt),
            email=validated_data['email'], 
            is_trainer=validated_data['is_trainer'])

        user.save()
        return user
