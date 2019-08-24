from rest_framework import permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated

from ..models import YouYodaUser as User
from ..serializers.profile_view_serializer import ProfileViewSerializer


class UsersGetList(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, format=None):
        auth_token = request.headers['Authorization'].replace('Token ', '')
        user = User.objects.get(auth_token=auth_token)
        """ if user is admin and active, let him to get data """
        col = ['id', 'first_name', 'last_name', 'location', 'username', 'about_me',
            'birth_date', 'phone_number', 'i_like', 'email', 'avatar_url', 'role_id', 'is_active', 'is_trainer']
        if(user.role_id == 3 and user.is_active):
            users = User.objects.all().values(*col)
            user_list = list(users)
            return Response(user_list, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
