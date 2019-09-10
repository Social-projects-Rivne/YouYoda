from rest_framework import serializers

from ..models import CoursesComments, YouYodaUser


class CommentsPostSerializator(serializers.ModelSerializer):
	"""Takes data and add comment to CoursesComments.
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
	"""Takes data from the CoursesComments model for create list of comments.
    Converts it to JSON format for transmission via the API.
    """

	class Meta:
		model = CoursesComments
		depth = 1
		fields = [
			'author', 'course', 'date',	'comment',
            ]
