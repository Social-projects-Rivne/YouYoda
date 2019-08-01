from django.shortcuts import redirect, render

from djoser.conf import django_settings


class PasswordResetView(APIView):

   def get (self, request, uid, token):
       post_data = {'uid': uid, 'token': token}
       return Response(post_data)
