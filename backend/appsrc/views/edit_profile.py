from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from ..models import YouYodaUser
from ..serializers.profile_edit_serializer import ProfileEditSerializer


class EditProfile(APIView):
    """Takes data from ProfileEditSerializer for fill/edit user profile."""

    permission_classes = [permissions.IsAuthenticated,]
    # permission_classes = [permissions.AllowAny,]


    def get(self, request):
        """Receives and transmits user profile data"""
        user = YouYodaUser.objects.get(user=request.user)
        serializer = ProfileEditSerializer(user)
        return Response(serializer.data)

    def patch(self, request, *args, **kwargs):
        """Receives and updates user profile data"""
        user= get_object_or_404(YouYodaUser, email=request.data.get('email'))
        # user = YouYodaUser.objects.get(user=request.user)
        serializer = ProfileEditSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
