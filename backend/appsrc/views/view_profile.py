from django.shortcuts import get_object_or_404
from django.contrib.auth import get_user_model
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions

from ..models import YouYodaUser
from ..serializers.profile_view_serializer import ProfileViewSerializer


class ViewProfile(APIView):
    """Takes data from ProfileViewSerializer for view user profile."""

    #permission_classes = [permissions.IsAuthenticated,]
    permission_classes = [permissions.AllowAny,]

  
    def get(self, request):
        """Receives and transmits user profile data"""
        user = YouYodaUser.objects.all()
        serializer = ProfileViewSerializer(user, many=True)
        return Response(serializer.data[0])

    # def get(self, request):
    #     """Receives and transmits user profile data"""
    #     user= get_object_or_404(User.objects.all(), email=request.data.get('email'))
    #     serializer = ProfileViewSerializer(user)
    #     return Response(serializer.data)




    
    


