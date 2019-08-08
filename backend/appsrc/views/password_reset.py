
from ..serializers.user_login_serializer import LoginSerializer
 

from rest_framework import permissions, status
from rest_framework.authtoken.models import Token
from rest_framework.views import APIView
from rest_framework.response import Response


class UserLogin(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format='json'):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data
            return Response({"user": user, "token": Token.objects.create(user=user)}, status=status.HTTP_200_ACCEPTED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)