from rest_framework import serializers

from ..models.user import User

class ProfileViewSerializer(serializers.ModelSerializer):

	class Meta:

		 model = User

		 fields = (
		 	'first_name', 'last_name', 'location', 'username', 
		 	'email', 'about_me', 'birth_date', 'phone_number',
		 	'avatar_url', 'role_id'
		 	)

	