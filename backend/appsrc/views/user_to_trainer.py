from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from ..models.user import User
from ..serializers.user_serializer import UserSerializer


class UserToTrainer(APIView):

	def get(self, request):
		users = User.objects.all();
		serializer = UserSerializer(users, many=True)

		return Response(serializer.data)

	def put(self, request):
		serializer = UserSerializer(data=request.data)
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data, status=status.HTTP_201_CREATED)
		else:
			return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
