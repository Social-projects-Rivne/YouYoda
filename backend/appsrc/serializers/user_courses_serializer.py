from rest_framework import serializers

from ..models import CoursesSubscribers, Courses


class SubscribedSerializer(serializers.ModelSerializer):


    class Meta:

        model = CoursesSubscribers
        fields = ('completed','feedback','rate',)


class UserCoursesSerializer(serializers.ModelSerializer):

	subscribed = SubscribedSerializer(source="subscribed_course", many="True")
    owner = serializers.StringRelatedField()
	categories = serializers.StringRelatedField()

	class Meta:

		 model = Courses

		 exclude = ('id',)
