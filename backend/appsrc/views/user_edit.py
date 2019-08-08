from ..serializers.user_registration_serializer import RegistrationSerializer
from ..models.user import User

from rest_framework import permissions, status
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.views import APIView


class UserRegistration(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format='json'):
        data_request=request.data
        serializer = RegistrationSerializer(data=data_request)
        if serializer.is_valid():
            user = serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
