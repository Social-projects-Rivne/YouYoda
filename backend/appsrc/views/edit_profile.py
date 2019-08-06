from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated


from ..models.user import User
from ..serializers.profile_edit_serializer import ProfileEditSerializer


class EditProfile(APIView):

    permission_classes = [permissions.IsAuthenticated,]
    #permission_classes = [permissions.AllowAny,]

    def get_object(self, pk):
        try:
            return user.objects.get(pk=pk)
        except user.DoesNotExist:
            raise Http404

    def get(self, request):
        user = User.objects.all()
        serializer = ProfileEditSerializer(user, many=True)
        return Response(serializer.data)
   
    def post(self, request, format=None):
        serializer = ProfileEditSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        saved_profile = get_object_or_404(User.objects.all(), pk=pk)
        data = request.data.get('user')
        serializer = ProfileEditSerializer(instance=saved_profile, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    

