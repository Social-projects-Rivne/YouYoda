from ..models import User as User
from .user_serializer import UserSerializer

from rest_framework import serializers


class ModeratorManageUsersSerializer(serializers.Serializer):
    users = UserSerializer(many=True)

    def create(self, validated_data):
        users_data = validated_data.pop('users')
        users_list = []
        for user_data in users_data:  
            user = User.objects.create(**user_data)
            user.set_password(user_data['password'])
            user.save()
            users_list.append({'user': user_data['username']})

        return users_list

    def update(self, instance, validated_data):
        users_data = validated_data.pop('users')
        users_list = []
        for user_data in users_data: 
            user = User.objects.get(id=user_data['id'])
            user.update(
                role_id = user_data.getattr('role_id'),
                hide_my_data = user_data.getattr('hide_my_data'),
                first_name = user_data.getattr('first_name'),
                last_name = user_data.getattr('last_name'),
                location = user_data.getattr('location'),
                username = user_data.getattr('username'),
                about_me = user_data.getattr('about_me'),
                i_like = user_data.getattr('i_like'),
                birth_date = user_data.getattr('birth_date'),
                phone_number = user_data.getattr('phone_number'),
                avatar_url = user_data.getattr('avatar_url'),
                is_trainer = user_data.getattr('is_trainer'),
                is_active = user_data.getattr('is_active')
            )
            user.set_password(user_data['password'])
            user.save()
            users_list.append({'user': user_data['username']})

        return users_list
