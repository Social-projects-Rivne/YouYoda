from ..models.user import User

from django.contrib.auth import get_user_model
from rest_framework import status, serializers
from rest_framework.validators import UniqueValidator


class RegistrationSerializer(serializers.ModelSerializer):

    class Meta:

    model = User
    fields = (
        'role_id', 'hide_my_data', 'first_name', 'last_name',
        'location', 'username', 'password', 'email', 'about_me',
        'birth_date', 'phone_number', 'is_active', 'avatar_url',
        'is_trainer'
        )

    def create(self, validated_data):
        user = User.objects.create_user(username=validated_data['username'], email=validated_data['email'])
        user.set_password(validated_data['password'])
        user.save()

        return user
