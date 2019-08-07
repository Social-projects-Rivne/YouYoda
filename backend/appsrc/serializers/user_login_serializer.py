from ..models.user import User

import bcrypt
from django.contrib.auth import authenticate
from rest_framework import serializers


class LoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('email', 'password')

    def validate(self, data):
    	hashed_pass = bcrypt.hashpw(data['password'], bcrypt.gensalt(12))
        user = authenticate(data['email'], hashed_pass)
        if user and user.is_active:
            return user
