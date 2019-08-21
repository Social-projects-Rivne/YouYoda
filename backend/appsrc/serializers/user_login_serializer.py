from django.contrib.auth import authenticate, login
from rest_framework import serializers

from ..models import YouYodaUser as User



class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    def validate(self, data):
        user = User.objects.get(email=data['email'])
        email=data['email']
        password=data['password']
        if email and password:
            if user.check_password(password):
                user = authenticate(email=email, password=password)
                if user and user.is_active:
                    #login(user)
                    return user
        return False
 


 
