from rest_framework import serializers

from ..models import YouYodaUser

class ProfileViewSerializer(serializers.ModelSerializer):
	"""Takes data from the User model for view user profile.
     
    Converts it to JSON format for transmission via the API.

    """

	class Meta:

		 model = YouYodaUser

		 fields = (
		 	'first_name', 'last_name', 'location', 'username', 'about_me', 
            'birth_date', 'phone_number', 'i_like', 'email', 'avatar_url'
            )
	