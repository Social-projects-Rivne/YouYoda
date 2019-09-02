from rest_framework import serializers
from rest_framework.authtoken.models import Token

from ..models import YouYodaUser as User

class CheckUserSerializer(serializers.Serializer):
    token = serializers.CharField(min_length=10)
    
    def validate(self, data):
        token=data['token']
        tokenObj = Token.objects.get(key=token)
        user_id = tokenObj.user_id
        if user_id > 0:
            user = User.objects.get(id=user_id)
            if user is not None:
                return user
        return False
