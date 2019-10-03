from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions

from ..models import Events, YouYodaUser
from ..serializers.organaize_event_serializer import OrganizeEventSerializer


class OrganizeEvent(APIView):
    """Takes data from OrganizeEventSerializer for fill/edit user events."""

    permission_classes = [permissions.IsAuthenticated, ]

    def get(self, request):
        """Receives and transmits user event data"""
        user = YouYodaUser.objects.get(auth_token=request.headers['Authorization'].replace('Token ', ''))
        event = Events.objects.filter(owner=user.id)
        serializer = OrganizeEventSerializer(event, many=True)
        return Response(serializer.data)

    def patch(self, request, *args, **kwargs):
        """Receives and updates user profile data"""
        data_request = request.data
        event = get_object_or_404(Events, id=request.data.get('id'))
        user = YouYodaUser.objects.get(auth_token=request.headers['Authorization'].replace('Token ', ''))
        data_request['owner'] = user.id
        serializer = OrganizeEventSerializer(event, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def post(self, request):
        data_request = request.data
        user = YouYodaUser.objects.get(auth_token=request.headers['Authorization'].replace('Token ', ''))
        data_request['owner'] = user.id
        # serializer = OrganizeEventSerializer(data=request.data)
        serializer = OrganizeEventSerializer(data=data_request)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
