from rest_framework import serializers

from ..models import Categories


class CategoriesSerializer(serializers.ModelSerializer):
	"""Takes data from the categories model for categories list component.
    Converts it to JSON format for transmission via the API.

    """


	class Meta:

		 model = Categories

		 fields = ("name", "id")
