from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import UpdateAPIView
from django.contrib.auth import get_user_model

from ..models.user import User
from ..serializers.profile_edit_serializer import ProfileEditSerializer


class EditProfile(APIView):
    #permission_classes = [permissions.IsAuthenticated,]

    permission_classes = [permissions.AllowAny,]

    def get(self, request):
        content = {'message': 'Hello, World!'}
        return Response(content)

    """def get_object(self, pk):
        try:
            return user.objects.get(pk=pk)
        except user.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        user = self.get_object(pk)
        serializer = ProfileEditSerializer(user)
        return Response(serializer.data)

    def get(self, request):
       serializer = ProfileEditSerializer(request.user)
       return Response(serializer.data)

    def post(self, request, pk, format=None):
        serializer = ProfileEditSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, pk, format=None):
        user = self.get_object(pk)
        serializer = ProfileEditSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        user = self.get_object(pk)
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)"""


