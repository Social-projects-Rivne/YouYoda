from rest_framework import serializers

from ..models import YouYodaUser


class UserSerializer(serializers.ModelSerializer):

    class Meta:

        model = YouYodaUser

        fields = (
            'role_id', 'hide_my_data', 'first_name', 'last_name',
            'location', 'username', 'password', 'email', 'about_me',
            'birth_date', 'phone_number', 'is_active', 'avatar_url',
            'is_trainer', 'status_id'
            )
