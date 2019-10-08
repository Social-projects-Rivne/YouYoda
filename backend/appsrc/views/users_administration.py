from rest_framework import permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated

from ..models import YouYodaUser as User
from ..models import UserStatuses
from ..serializers.profile_view_serializer import ProfileViewSerializer
from ..serializers.moderation_serializer import ManageUsersStatusesSerializer, ManageUserDataSerializer


IS_ADMIN = 3
IS_MODERATOR = 2

class UsersGetList(APIView):
    """ Manage users data by admins and moderators """
    permission_classes = [permissions.IsAuthenticated,]

    def get(self, request, format=None):
        """ Get users data by token and role access """
        auth_token = request.headers['Authorization'].replace('Token ', '')
        user = User.objects.get(auth_token=auth_token)
        # if user is admin or moderator and active, let him to get data
        col = ['id', 'first_name', 'last_name', 'location', 'username', 'about_me',
            'birth_date', 'phone_number', 'i_like', 'email', 'avatar_url', 'role_id', 'is_active', 'is_trainer']
        if((user.role_id == IS_ADMIN or user.role_id == IS_MODERATOR) and user.is_active and user.status_id == 1):
            users = User.objects.all().values(*col)
            user_list = list(users)
            return Response(user_list, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class GetUsersStatuses(APIView):
    """ Manage users data by admins and moderators """
    permission_classes = [permissions.IsAuthenticated,]

    def get(self, request, format=None):
        """ Get users statuses by their id and role access """
        auth_token = request.headers['Authorization'].replace('Token ', '')
        user = User.objects.get(auth_token=auth_token)
        # if user is admin or moderator and active, let him to get data
        col = ['id', 'role_id', 'email', 'status_id']
        if((user.role_id == IS_ADMIN or user.role_id == IS_MODERATOR) and user.is_active and user.status_id == 1):
            users = User.objects.all().values(*col)
            user_list = list(users)
            return Response(user_list, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UpdateUsersStatuses(APIView):
    """ Manage users data by admins and moderators """
    permission_classes = [permissions.IsAuthenticated,]

    def patch(self, request):
        """ Patch request to database """
        users = request.data
        if users is not None:
            for user_id, status_id in users.items():
                user = User.objects.get(id=user_id)
                serializer = ManageUsersStatusesSerializer(user, data={'status_id': status_id}, partial=True)
                if serializer.is_valid():
                    serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UpdateUsersData(APIView):
    """ Manage users data by admins and moderators """
    permission_classes = [permissions.IsAuthenticated,]

    def patch(self, request):
        """ Patch request to database """
        users = request.data
        if users is not None:
            for user_data in users.items():
                user = User.objects.get(id=user_data.id)
                serializer = ManageUserDataSerializer(user, data=user_data, partial=True)
                if serializer.is_valid():
                    serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

