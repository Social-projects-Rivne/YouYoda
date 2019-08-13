from ..models.user import User

import bcrypt
from rest_framework import serializers

class BcriptHash(serializers.Serializer):
    class Meta:
        model = User
        fields = ('psalt', )

    def set_password(self, validated_data)
        psalt=bcrypt.gensalt(12),
        password=bcrypt.hashpw(validated_data['password'].encode(encoding='UTF-8'), psalt),

        hashed = bcrypt.hashpw(data['password'].encode(encoding='UTF-8'), user['psalt'])
