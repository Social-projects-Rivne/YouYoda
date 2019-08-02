from ..serializers.user_registration_serializer import RegistrationSerializer
from ..models.user import User

from django.db import IntegrityError
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.views import APIView


class UserRegistration(APIView):
    permission_classes = (permissions.AllowAny)

    def post(self, request, *args, **kwargs):
        serializer = RegistrationSerializer(data=request.data)
        if serializer.is_valid():
            # user = serializer.save()
            try: 
                User.objects.create_user(serializer.init_data)
            except IntegrityError:
                status = 'User already exists'
            else:
                status = 'User was created'
            return Response(status)
        else:
            status = 'Error, invalid data'
            return Response(status)