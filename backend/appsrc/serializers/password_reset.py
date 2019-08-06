from rest_framework import serializers

from ..models.user import User

class SerializerPasswordReset(serializers.ModelSerializer):
	
	class Meta:

		 model = User

		 fields = ('email',)