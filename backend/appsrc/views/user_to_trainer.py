from rest_framework import status
from rest_framework import permissions
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from ..models import YouYodaUser
from ..serializers.user_to_trainer_serializer import UserToTrainerSerializer


class UserToTrainer(APIView):
    """Takes data from UserToTrainerSerializer for change user role."""

    permission_classes = [permissions.IsAuthenticated, ]

    def patch(self, request):
        """Receives and updates user role"""
        user = YouYodaUser.objects.get(auth_token=request.headers['Authorization'].replace('Token ', ''))
        serializer = UserToTrainerSerializer(user)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
