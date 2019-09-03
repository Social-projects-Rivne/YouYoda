import django_filters
from ..models import Courses


class ProductFilter(django_filters.FilterSet):
    cost = django_filters.NumberFilter()
    cost__gt = django_filters.NumberFilter(field_name='cost', lookup_expr='gt')
    cost__lt = django_filters.NumberFilter(field_name='cost', lookup_expr='lt')


    manufacturer__name = django_filters.CharFilter(lookup_expr='icontains')

    class Meta:
        model = Courses
        fields = ["cost"]