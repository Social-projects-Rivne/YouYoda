from django.shortcuts import render
from django.shortcuts import get_object_or_404
from django.contrib.auth import get_user_model
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions

from ..models.user import User
from ..serializers.profile_view_serializer import ProfileViewSerializer


class ViewProfile(APIView):

    #permission_classes = [permissions.IsAuthenticated,]
    permission_classes = [permissions.AllowAny,]

    # def get_object(self, pk):
    #     try:
    #         return user.objects.get(pk=pk)
    #     except user.DoesNotExist:
    #         raise Http404

    def get(self, request):
        user = User.objects.all()
        serializer = ProfileViewSerializer(user, many=True)
        return Response(serializer.data)


    
    


