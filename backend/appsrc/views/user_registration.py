from ..serializers.user_registration_serializer import RegistrationSerializer
from ..models.user import User

from django.contrib.auth import get_user_model
from rest_framework import permissions, status
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.views import APIView


User = get_user_model()

class UserRegistration(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format='json'):
        dataa=request.data
        print(dataa)
        if dataa.is_trainer:
            dataa.is_trainer=True
        else:
            dataa.is_trainer=False    
        serializer = RegistrationSerializer(data=dataa)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                token = Token.objects.create(user=user)
                json = serializer.data
                json['token'] = token.key
                return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)