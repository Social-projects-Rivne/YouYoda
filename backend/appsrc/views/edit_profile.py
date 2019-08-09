from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404


from ..models.user import User
from ..serializers.profile_edit_serializer import ProfileEditSerializer


class EditProfile(APIView):

    #permission_classes = [permissions.IsAuthenticated,]
    #authentication_classes = (TokenAuthentication,) 
    permission_classes = [permissions.AllowAny,]

    #def get_object(self, pk):
     #   try:
      #      return user.objects.get(pk=pk)
       # except user.DoesNotExist:
        #    raise Http404

    def get(self, request):
        user = User.objects.all()
        serializer = ProfileEditSerializer(user, many=True)
        return Response(serializer.data)
   
    # def post(self, request, format=None):
    #     serializer = ProfileEditSerializer(data=request.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         print(serializer.data)
    #         return Response(serializer.data, status=status.HTTP_201_CREATED)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request):
        saved_profile = get_object_or_404(User, email=request.data.get('email'))
        serializer = ProfileEditSerializer(data=request.data, partial=True)
        import pdb; pdb.set_trace()
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)