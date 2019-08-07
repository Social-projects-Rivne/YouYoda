from ..models.user import User

import bcrypt
from django.contrib.auth import authenticate
from rest_framework import serializers


class LoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('email', 'password')

    def validate(self, data):
        hashed_pass = bcrypt.hashpw(data['password'].encode(encoding='UTF-8'), bcrypt.gensalt(12))
        user = authenticate(data['email'], hashed_pass)
        # user = authenticate(**data)
        if user and user.is_active:
            return user
