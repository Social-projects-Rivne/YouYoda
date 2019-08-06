from django.shortcuts import render
from django.contrib.auth import get_user_model
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import UpdateAPIView


from ..models.user import User
from ..serializers.profile_edit_serializer import ProfileEditSerializer


class EditProfile(APIView):

    permission_classes = [permissions.IsAuthenticated,]
    #permission_classes = [permissions.AllowAny,]

    def get_object(self, pk):
        try:
            return user.objects.get(pk=pk)
        except user.DoesNotExist:
            raise Http404
   
    #def post(self, request, pk, format=None):
     #   serializer = ProfileEditSerializer(data=request.data)
      #  if serializer.is_valid():
       #     serializer.save()
        #    return Response(serializer.data, status=status.HTTP_201_CREATED)
        #return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def post(self, request, format=None):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    

