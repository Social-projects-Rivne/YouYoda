from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions

from ..models import Events
from ..serializers.organaize_event_serializer import OrganizeEventSerializer


class OrganizeEvent(APIView):
    """Takes data from OrganizeEventSerializer for fill/edit user events."""

    permission_classes = [permissions.AllowAny, ]

    def get(self, request):
        """Receives and transmits user event data"""
        event = Events.objects.get(auth_token=request.headers['Authorization'].replace('Token ', ''))
        serializer = OrganizeEventSerializer(event)
        return Response(serializer.data)

    def patch(self, request, *args, **kwargs):
        """Receives and updates user event data"""
        event = get_object_or_404(Events, email=request.data.get('email'))
        # event = Events.objects.get(auth_token=request.headers['Authorization'].replace('Token ', ''))
        serializer = OrganizeEventSerializer(event, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def post(self, request, format='json'):
        data_request=request.data
        serializer = OrganizeEventSerializer(data=data_request)
        if serializer.is_valid():
            event = serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)