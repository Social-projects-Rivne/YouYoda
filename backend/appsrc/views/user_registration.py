from ..serializers.user_registration_serializer import RegistrationSerializer
from ..serializers.user_serializer import UserSerializer
from ..models.user import User

from django.contrib.auth import get_user_model
from rest_framework import generics, status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView


User = get_user_model()

class UserRegistration(APIView):
    permission_classes = (permissions.AllowAny)

    def post(self, request, *args, **kwargs):
        serializer = RegistrationSerializer(data=request.data)
        if serializer.is_valid():
            # user = serializer.save()
            try: 
            	User.objects.create_user(serializer.init_data)
            except IntegrityError:
    		    # user already exists
    		    status = 'User already exists'
    		else:
    		    status = 'User was created'
            return HttpResponse(status)
