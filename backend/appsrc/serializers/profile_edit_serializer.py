from rest_framework import serializers

from ..models.user import User

class ProfileEditSerializer(serializers.ModelSerializer):

    class Meta:

        model = User

        fields = (
		 	'first_name', 'last_name', 'location', 'username', 'about_me', 
            'birth_date', 'phone_number'
            )

    def create(self, validated_data):
        user = User.objects.create(
            first_name = validated_data.get('first_name'),
            last_name = validated_data.get('last_name'),
            location = validated_data.get('location'),
            username = validated_data.get('username'),
            about_me = validated_data.get('about_me'),
            birth_date = validated_data.get('birth_date'),
            phone_number = validated_data.get('phone_number'))

        user.save()
        return user

    def update(self, instance, validated_data):
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.location = validated_data.get('location', instance.location)
        instance.username = validated_data.get('username', instance.username)
        instance.about_me = validated_data.get('about_me', instance.about_mee)
        instance.birth_date = validated_data.get('birth_daten', instance.birth_date)
        instance.phone_number = validated_data.get('phone_number', instance.phone_number)

        instance.save()
        return instance

	