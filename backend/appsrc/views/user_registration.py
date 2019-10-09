from djoser.compat import get_user_email
from djoser.conf import settings
from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView

from ..models import YouYodaUser
from ..serializers.user_registration_serializer import RegistrationSerializer, SocialRegistrationSerializer


class UserRegistration(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format='json'):
        data_request=request.data
        username = data_request.get('username')
        user = YouYodaUser.objects.filter(username=username)
        if user:
            msg = "You can not use this email. Try another or login."
            return Response(msg, status=status.HTTP_208_ALREADY_REPORTED)

        serializer = RegistrationSerializer(data=data_request)
        if serializer.is_valid():
            user = serializer.save()
            context = {"user": user}
            to = [get_user_email(user)]
            if settings.SEND_ACTIVATION_EMAIL:
                settings.EMAIL.activation(self.request, context).send(to)
            elif settings.SEND_CONFIRMATION_EMAIL:
                settings.EMAIL.confirmation(self.request, context).send(to)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserSocialRegistration(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format='json'):
        data_request=request.data
        serializer = SocialRegistrationSerializer(data=data_request)
        if serializer.is_valid():
            user = serializer.save()
            context = {"user": user}
            to = [get_user_email(user)]
            if settings.SEND_ACTIVATION_EMAIL:
                settings.EMAIL.activation(self.request, context).send(to)
            elif settings.SEND_CONFIRMATION_EMAIL:
                settings.EMAIL.confirmation(self.request, context).send(to)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
