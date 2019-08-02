from ..models.user import User

from rest_framework import status, serializers


class RegistrationSerializer(serializers.ModelSerializer):

    class Meta:

    model = User
    fields = ('username', 'password', 'email')

    def create(self, validated_data):
        user = User.objects.create_user(username=validated_data['username'], email=validated_data['email'])
        user.set_password(validated_data['password'])
        user.save()

        return user
