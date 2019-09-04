import django_filters
from ..models import Courses


class CoursesFilter(django_filters.FilterSet):

    cost = django_filters.NumberFilter()
    cost_gte = django_filters.NumberFilter(field_name='cost', lookup_expr='gte')
    cost_lt = django_filters.NumberFilter(field_name='cost', lookup_expr='lt')


    manufacturer__name = django_filters.CharFilter(lookup_expr='icontains')

    class Meta:
        model = Courses
        fields = ["cost"]
