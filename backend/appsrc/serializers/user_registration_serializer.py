from ..models import YouYodaUser

import bcrypt
from rest_framework import serializers


class RegistrationSerializer(serializers.ModelSerializer):

    class Meta:
        model = YouYodaUser
        fields = ('username', 'password', 'psalt', 'email', 'is_trainer')

    def create(self, validated_data):
        salt = bcrypt.gensalt(12)
        user = User.objects.create(
            username=validated_data['username'],
            psalt=salt,
            password=bcrypt.hashpw(validated_data['password'].encode(encoding='UTF-8'), salt),
            email=validated_data['email'], 
            is_trainer=validated_data['is_trainer'])

        user.save()
        return user
