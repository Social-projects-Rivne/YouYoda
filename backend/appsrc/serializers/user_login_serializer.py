from ..models.user import User

import bcrypt
from django.contrib.auth import authenticate
from rest_framework import serializers


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    def validate(self, data):
        user = User.objects.get(email=data['email'])
        hashed = bcrypt.hashpw(data['password'].encode(encoding='UTF-8'), bcrypt.gensalt(12))
        import pdb; pdb.set_trace()
        if bcrypt.checkpw(data['password'].encode(encoding='UTF-8'), user.password.encode(encoding='UTF-8')):
            user_auth = authenticate(user)
            import pdb; pdb.set_trace()
            if user_auth:
                if user.is_active:
                    import pdb; pdb.set_trace()
                    return user_auth
        import pdb; pdb.set_trace()
        return False