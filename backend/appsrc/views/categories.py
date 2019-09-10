from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from django.conf import settings
from django.core.cache.backends.base import DEFAULT_TIMEOUT
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page

from ..models import Categories
from ..serializers.categories_serializer import CategoriesSerializer


CACHE_TTL = getattr(settings, 'CACHE_TTL', DEFAULT_TIMEOUT)

class CategoriesList(APIView):
    """Takes data from CategoriesSerializer for view list of categories"""

    permission_classes = [permissions.AllowAny,]

    @method_decorator(cache_page(CACHE_TTL), name='categories_list')
    def get(self, request):
        """First check request data in cache, then pull data from db"""
        categories = Categories.objects.all()
        serializer = CategoriesSerializer(categories, many=True)
        return Response(serializer.data)
