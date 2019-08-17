from ..models import YouYodaUser as User

from django.contrib.auth import authenticate, login
from rest_framework import serializers


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    def validate(self, data):
        user = User.objects.get(email=data['email'])
        if user.check_password(data['password']):
            user_auth = authenticate(user)
            if user_auth and user.is_active:
                login(user_auth)
                return user_auth
        return False