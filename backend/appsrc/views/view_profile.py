#from django.contrib.auth import get_user_model
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions

from ..models import YouYodaUser
from ..serializers.profile_view_serializer import ProfileViewSerializer


class ViewProfile(APIView):
    """Takes data from ProfileViewSerializer for view user profile."""

    permission_classes = [permissions.IsAuthenticated,]
    # permission_classes = [permissions.AllowAny,]

    def get(self, request):
        """Receives and transmits user profile data"""
        user = YouYodaUser.objects.get(user=request.user)
        serializer = ProfileEditSerializer(user)
        return Response(serializer.data)


    

