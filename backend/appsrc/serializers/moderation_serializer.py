from ..models import YouYodaUser
from .user_serializer import UserSerializer

from rest_framework import serializers


class ManageUsersSerializer(serializers.Serializer):
    users = UserSerializer(many=True)

    def create(self, validated_data):
        users_data = validated_data.pop('users')
        users_list = []
        for user_data in users_data:  
            user = YouYodaUser.objects.create(**user_data)
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

class ManageUsersStatusesSerializer(serializers.ModelSerializer):
    """
    Takes or updates data from the YouYodaUser model for change user role.
    Converts it to JSON format for transmission via the API.
    """

    class Meta:

        model = YouYodaUser

        fields = (
            'status_id', 
            )

        def update(self, instance, validated_data):
            """Updating users' statuses"""

            users_data = validated_data.pop('users')
            users_list = []
            id_list = user_data['id']
            status_list = user_data['status_id']
            for i in range(len(id_list)):
                user = YouYodaUser.objects.get(id=id_list[i-1])
                s_id = status_list[i-1]

                if(s_id == 'Active'):
                    s_id = 1
                elif(s_id == 'Banned'):
                    s_id = 2
                elif(s_id == 'Muted'):
                    s_id = 3
                elif(s_id == 'Idle'):
                    s_id = 4
    
                user.update(status_id = s_id)
                users_list.append({'user': user_data['id']})
    
            return users_list
