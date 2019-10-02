from rest_framework import serializers

from ..models import PDPNotes


class PDPSerializator(serializers.ModelSerializer):
	"""Takes data and add notes to PDPNotes.

    Converts it to JSON format for transmission via the API.
    """

	class Meta:
		model = PDPNotes
		fields = ('__all__')

	def create(self, validated_data):
		"""Create user notes"""

		user = PDPNotes.objects.create(
			author=validated_data.get('author'),
			title=validated_data.get('title'),
			description=validated_data.get('description'),
			start=validated_data.get('start'),
			end=validated_data.get('end'),
			cover_url=validated_data.get('cover_url'),
			status=validated_data.get('status')
		)

		return user