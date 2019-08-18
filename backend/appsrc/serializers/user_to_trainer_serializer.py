from rest_framework import serializers

from .models import YouYodaUser

class UserToTrainerSerializer(serializers.ModelSerializer):
	"""Takes or updates data from the YouYodaUser model for change user role.

    Converts it to JSON format for transmission via the API.

    """

	class Meta:

		 model = YouYodaUser

		 fields = (
		 	'is_trainer',
		 	)
    def update(self, instance, validated_data):
         """Update user role"""

         instance.is_trainer = validated_data.get('is_trainer', instance.is_trainer)

         instance.save()
         return instance
