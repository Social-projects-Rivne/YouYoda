from ..models import YouYodaUser

import bcrypt
from django.contrib.auth import authenticate, login
from rest_framework import serializers


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    def validate(self, data):
        user = User.objects.get(email=data['email'])
        hashed = bcrypt.hashpw(data['password'].encode(encoding='UTF-8'), user['psalt'])
        if user['password'] == hashed:
            user_auth = authenticate(user)
            if user_auth and user.is_active:
                login(user_auth)
                return user_auth
        return False