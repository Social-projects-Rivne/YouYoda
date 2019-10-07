from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from ..models import YouYodaUser, PDPNotes
from ..serializers.pdp_serializer import PDPSerializator


class PDP(APIView):
    """Takes data from PDPSerializator for fill/edit user pdp."""

    permission_classes = [permissions.IsAuthenticated,]

    def get(self, request):
        """Receives and transmits user pdp data"""
        auth_token = request.headers['Authorization'][6:]
        user = YouYodaUser.objects.get(auth_token=auth_token)
        data_pdp = PDPNotes.objects.filter(author = user.id)
        serializer = PDPSerializator(data_pdp, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        """Receives and updates user pdp data"""
        data_pdp=request.data
        auth_token = request.headers['Authorization'][6:]
        user = YouYodaUser.objects.get(auth_token=auth_token)
        data_pdp['author'] = user.id
        serializer = PDPSerializator(data=data_pdp, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request):
        auth_token = request.headers['Authorization'][6:]
        user = YouYodaUser.objects.get(auth_token=auth_token)
        data_pdp = PDPNotes.objects.filter(author = user.id, id= request.data['id'])
        data_pdp.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
