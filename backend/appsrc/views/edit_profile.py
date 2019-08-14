from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import UpdateAPIView


from ..models import YouYodaUser
from ..serializers.profile_edit_serializer import ProfileEditSerializer


class EditProfile(APIView):
    """Takes data from ProfileEditSerializer for fill/edit user profile."""

    #permission_classes = [permissions.IsAuthenticated,]
    #authentication_classes = (TokenAuthentication,) 
    permission_classes = [permissions.AllowAny,]


    # def get(self, request):
    #     """Receives and transmits user profile data"""
    #     user= get_object_or_404(User.objects.all(), email=request.data.get('email'))
    #     serializer = ProfileEditSerializer(user)
    #     return Response(serializer.data)


    def get(self, request):
        """Receives and transmits user profile data"""
        user = YouYodaUser.objects.all()
        serializer = ProfileEditSerializer(user, many=True)
        return Response(serializer.data[0])

    # method for filtering data
    # def get(self, request):
    #     user = User.objects.all().filter()
    #     serializer = ProfileEditSerializer(user, many=True)
    #     return Response(serializer.data)


    # def post(self, request, format=None):
    #     serializer = ProfileEditSerializer(data=request.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         print(serializer.data)
    #         return Response(serializer.data, status=status.HTTP_201_CREATED)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, *args, **kwargs):
        """Receives and updates user profile data"""
        user= get_object_or_404(YouYodaUser, email=request.data.get('email'))
        serializer = ProfileEditSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            user = serializer.save()
            return Response(ProfileEditSerializer(user).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

