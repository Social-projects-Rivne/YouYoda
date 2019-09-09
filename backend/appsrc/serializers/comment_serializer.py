from rest_framework import serializers

from ..models import CoursesComments


class CommentsPostSerializator(serializers.ModelSerializer):
	"""Takes data from the CoursesComponents model for create list of comments.
    Converts it to JSON format for transmission via the API.

    """
	
	class Meta:

		model = CoursesComments

		fields = (
			'author', 'course', 'date',	'comment'
            )

		def create(self, validated_data):
			comments = CoursesComments.objects.create(
				author = validated_data['author'],
				comment = validated_data['comment'],
				course = validated_data['course']
				)
			comments.save()

			return comments


class CommentsGetSerializator(serializers.ModelSerializer):
	"""Takes data from the CoursesComponents model for create list of comments.
    Converts it to JSON format for transmission via the API.

    """
	author = serializers.StringRelatedField()


	class Meta:

		model = CoursesComments

		fields = (
			'author', 'course', 'date',	'comment'
            )