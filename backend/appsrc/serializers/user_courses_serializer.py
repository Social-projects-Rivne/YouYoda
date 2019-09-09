from rest_framework import serializers

from ..models import CoursesSubscribers, Courses


class SubscribedSerializer(serializers.ModelSerializer):
    class Meta:
        model = CoursesSubscribers
        fields = ('completed','feedback','rate',)
		# fields = "__all__"

class UserCoursesSerializer(serializers.ModelSerializer):

	subscribed = SubscribedSerializer(source="subscribed_course", many="True")
	# course_id = serializers.StringRelatedField()
	# participant_id = serializers.StringRelatedField()
	class Meta:

		 model = Courses
		 fields = ("description", "coursename", "subscribed")
		 # fields = "__all__"

# class UserCoursesSerializer(serializers.Serializer):
#
#
#     id = serializers.IntegerField(read_only=True)
#     completed = serializers.BooleanField()
#     feedback = serializers.CharField()
#     rate = serializers.IntegerField()
#     course_id = serializers.CharField()
#     participant_id = serializers.CharField()
