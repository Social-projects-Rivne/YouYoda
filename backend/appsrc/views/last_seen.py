from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from rest_framework import generics
from rest_framework.permissions import AllowAny

from ..models import YouYodaUser
from ..serializers.last_seen_serializer import LastSeenSerializator



class LastSeen(APIView):
    """Takes data from LastSeenSerializator for check user online"""

    permission_classes = [permissions.AllowAny,]

    def get(self, request):
        """Receives and transmits date when user was seen"""
        trainer_id = request.query_params.get('trainer_id')
        trainer = YouYodaUser.objects.get(id=trainer_id)
        serializer = LastSeenSerializator(trainer)
        return Response(serializer.data)

    def patch(self, request, *args, **kwargs):
        """Receives and updates date when user was seen"""
        auth_token = request.headers['Authorization'][6:]
        user = YouYodaUser.objects.get(auth_token=auth_token)
        serializer = LastSeenSerializator(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
