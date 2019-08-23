from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from ..models import YouYodaUser
from ..serializers.change_password_serializer import ChangePasswordSerializer

class ChangePassword(APIView):
    """Takes data from ChangePasswordSerializer for edit user password."""

    permission_classes = [permissions.IsAuthenticated,]

    def put(self, request, *args, **kwargs):
        """Receives and updates user password"""
        user= get_object_or_404(YouYodaUser, email=request.data.get('email'))
        # user = YouYodaUser.objects.get(auth_token=request.headers['Authorization'].replace('Token ', ''))
        serializer = ChangePasswordSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)