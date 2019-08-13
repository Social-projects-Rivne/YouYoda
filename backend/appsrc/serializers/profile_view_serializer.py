from rest_framework import serializers

from ..models.user import User

class ProfileViewSerializer(serializers.ModelSerializer):
	"""Takes data from the User model for view user profile.
     
    Converts it to JSON format for transmission via the API.

    """

	class Meta:

		 model = User

		 fields = (
		 	'first_name', 'last_name', 'location', 'username', 'about_me', 
            'birth_date', 'phone_number', 'i_like', 'email', 'avatar_url'
            )
	