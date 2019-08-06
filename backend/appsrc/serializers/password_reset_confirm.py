from rest_framework import serializers

from ..models.user import User

class PasswordResetConfirm(serializers.ModelSerializer):

	class Meta:

		 model = User

		 fields = ('password')