from rest_framework import serializers

from ..models import UsersAchievements, Achievements


class SubscribedSerializer(serializers.ModelSerializer):
    """Takes data from the UsersAchievements model for getting user achievements.

    Converts it to JSON format for transmission via the API.
    """

    class Meta:

        model = UsersAchievements
        fields = ('achievement',)


class UsersAchievementsSerializer(serializers.ModelSerializer):
    """Takes data from the Achievements model for view information about user
    achievements.

    Converts it to JSON format for transmission via the API.
    """

    achievement = SubscribedSerializer(source="user_achievements", many="True")

    class Meta:

        model = Achievements
        exclude = ('id',)
