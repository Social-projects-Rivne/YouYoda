from django.utils.timezone import now

from rest_framework.views import APIView
from djoser.compat import get_user_email
from djoser.conf import settings
from rest_framework import status, viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from ..serializers.password_reset_confirm_serializator import PasswordResetConfirm

class ResetPasswordConfirm(APIView):
    permission_classes = (permissions.AllowAny,)



    
    def post(self, request, *args, **kwargs):
        serializer = PasswordResetConfirm(data=request.data)
        serializer.is_valid(raise_exception=True)

        hased = bcrypt.hashpw(serializer.data["new_password"]
                                .encode(encoding='UTF-8'),
                                serializer.user['psalt'])
        serializer.user["password"] = hased
        if hasattr(serializer.user, "last_login"):
            serializer.user.last_login = now()
        serializer.user.save()

        if settings.PASSWORD_CHANGED_EMAIL_CONFIRMATION:
            context = {"user": serializer.user}
            to = [get_user_email(serializer.user)]
            settings.EMAIL.password_changed_confirmation(self.request, context).send(to)
        return Response(status=status.HTTP_204_NO_CONTENT)
