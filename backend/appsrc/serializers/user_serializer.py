from rest_framework import serializers

from ..models import YouYodaUser


class UserSerializer(serializers.ModelSerializer):

    class Meta:

        model = YouYodaUser

        fields = ('__all__')
