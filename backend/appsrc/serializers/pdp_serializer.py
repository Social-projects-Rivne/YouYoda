from rest_framework import serializers

from ..models import PDP


class PDPSerializator(serializers.ModelSerializer):
	"""Takes data and add course, user to CoursesSubscribers.

    Converts it to JSON format for transmission via the API.
    """

	class Meta:
		model = PDP
		fields = ('__all__')

	def create(self, validated_data):
		"""Create user profile"""

		user = PDP.objects.create(
			author=validated_data.get('author'),
			note=validated_data.get('note'),
			date=validated_data.get('date'),
			status=validated_data.get('status')
		)

		user.save()
		return user

	def update(self, instance, validated_data):
		"""Update user profile"""

		instance.note = validated_data.get('note', instance.note)
		instance.date = validated_data.get('date', instance.date)
		instance.status = validated_data.get('status', instance.status)

		instance.save()
		return instance
