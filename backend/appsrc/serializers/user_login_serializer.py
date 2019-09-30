from datetime import datetime
from django.contrib.auth import authenticate, login
from facepy import GraphAPI
from google.oauth2 import credentials
from rest_framework import serializers

from ..models import YouYodaUser as User


class LoginSerializer(serializers.Serializer):
    """Validate request data for user login

    Converts it to JSON format for transmission via the API.

    """

    email = serializers.EmailField()
    password = serializers.CharField()

    def validate(self, data):
        user = User.objects.get(email=data['email'])
        email=data['email']
        password=data['password']
        if email and password:
            if user.check_password(password):
                user = authenticate(email=email, password=password)
                if user and user.is_active:
                    #login(user)
                    user.last_login = datetime.now()
                    user.save(update_fields=['last_login'])
                    return user
        return False


class SocialLoginSerializer(serializers.Serializer):
    """Validate request data and token from network for user login via social networks

    Converts it to JSON format for transmission via the API.

    """

    email = serializers.EmailField()
    access_token = serializers.CharField(max_length=None)
    network_name = serializers.CharField()

    def validate(self, data):
        user = User.objects.get(email=data['email'])
        email=data['email']
        access_token=data['access_token']
        network_name=data['network_name']
        if network_name == 'Facebook':
            graph = GraphAPI(access_token)
            try:
                if graph.get('me'):
                    if user and user.is_active:
                        return user
            except GraphAPI.OAuthError:
                return False
        elif network_name == 'Google':
            credential = credentials.Credentials(access_token)
            if user and user.is_active:
                return user
            return False
