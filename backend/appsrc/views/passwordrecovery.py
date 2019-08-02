from django.shortcuts import redirect, render

from djoser.conf import django_settings
from rest_framework import generics, status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView

from ..serializers.user_serializer import UserSerializer
from ..models.user import User


class PasswordRecovery(APIView):

   def get (self, request):
       pass
