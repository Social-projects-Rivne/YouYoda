from rest_framework import serializers
from ..models import Events, Categories


class CategoriesField(serializers.Field):
    """
    Taking id and name of categories from data
    """
    def to_representation(self, value):
        return value.name

    def to_internal_value(self, data):
        return Categories.objects.get(id=data)


class OrganizeEventSerializer(serializers.ModelSerializer):
    """Takes or updates data from the Event model for organize events user profile.
    Converts it to JSON format for transmission via the API.
    """
    categories = CategoriesField()

    def get_categories(self, value):
        return self.category_to_id[value.categories.id]

    class Meta:
        model = Events

        fields = (
            'categories', 'name', 'description', 'owner',
            'date', 'location', 'cover_url',
            'id',
        )

    def create(self, validated_data):

        event = Events.objects.create(
            categories=validated_data.get('categories'),
            name=validated_data.get('name'),
            description=validated_data.get('description'),
            owner=validated_data.get('owner'),
            date=validated_data.get('date'),
            location=validated_data.get('location'),
            cover_url=validated_data.get('cover_url'),
            id=validated_data.get('id')
        )
        event.save()
        return event

    def update(self, instance, validated_data):

        instance.categories = validated_data.get('categories', instance.categories)
        instance.name = validated_data.get('name', instance.name)
        instance.description = validated_data.get('description', instance.description)
        instance.owner = validated_data.get('owner', instance.owner)
        instance.date = validated_data.get('date', instance.date)
        instance.location = validated_data.get('location', instance.location)
        instance.cover_url = validated_data.get('cover_url', instance.cover_url)
        instance.id = validated_data.get('id', instance.id)

        instance.save()
        return instance
