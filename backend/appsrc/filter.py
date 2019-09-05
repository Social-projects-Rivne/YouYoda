import django_filters
from .models import Courses

class NumberInFilter(django_filters.BaseInFilter, django_filters.NumberFilter):
    pass
class CharInFilter(django_filters.BaseInFilter, django_filters.CharFilter):
    pass
# class IntegerListFilter(django_filters.Filter):
#     def filter(self,qs,value):
#         if value not in (None,''):
#             integers = [int(v) for v in value.split(',')]
#             return qs.filter(**{'%s__%s'%(self.field_name, self.lookup_expr):integers})
#         return qs
class CoursesFilter(django_filters.FilterSet):

    cost = django_filters.NumberFilter()
    cost_gte = django_filters.NumberFilter(field_name='cost', lookup_expr='gte')
    cost_lt = django_filters.NumberFilter(field_name='cost', lookup_expr='lt')
    rate_gte = django_filters.NumberFilter(field_name='rate', lookup_expr='gte')
    status_in = CharInFilter(field_name='status', lookup_expr='in')
    categories_in = NumberInFilter(field_name='categories', lookup_expr='in')

    class Meta:
        model = Courses
        fields = ['cost', 'rate', 'status', 'categories']
