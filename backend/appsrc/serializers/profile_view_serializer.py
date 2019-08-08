from rest_framework import serializers

from ..models.user import User

class ProfileViewSerializer(serializers.ModelSerializer):

	class Meta:

		 model = User

		 fields = (
		 	'first_name', 'last_name', 'about_me', 'avatar_url'
		 	)

	