from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from django.core import serializers
from django.db.models import Q
from itertools import chain
import json
import re

from ..models import Events, Courses, YouYodaUser


PROTECTED_USER = ['password','username','email','phone_number','is_superuser']

def normalize_query(query_string,
                    findterms=re.compile(r'"([^"]+)"|(\S+)').findall,
                    normspace=re.compile(r'\s{2,}').sub):
    """
    Splits the query string in invidual keywords, getting rid of unecessary spaces
    and grouping quoted words together.
    Example:
    normalize_query('some random words "with   quotes  " and   spaces')
    ['some', 'random', 'words', 'with quotes', 'and', 'spaces']
    """

    return [normspace(' ', (t[0] or t[1]).strip()) for t in findterms(query_string)]

def get_query(query_string, search_fields):
    """
    Returns a query, that is a combination of Q objects. That combination
    aims to search keywords within a model by testing the given search fields.
    """

    query = None
    terms = normalize_query(query_string)
    for term in terms:
        or_query = None
        for field_name in search_fields:
            q = Q(**{"%s__icontains" % field_name: term})
            if or_query is None:
                or_query = q
            else:
                or_query = or_query | q
        if query is None:
            query = or_query
        else:
            query = query & or_query
    return query


class SiteSearch(APIView):
    """
    Search data in database by query param, 
    sort, filter personal data and send JSON for view searching results
    """

    count = 0
    permission_classes = [permissions.AllowAny,]

    def get(self, request):
        query_string = ''
        found_entries = None
        limit = int(request.GET['limit'])
        if request.GET.get('q', '').strip():
            query_string = request.GET['q']
            event_entry_query = get_query(query_string,
                                    ['name', 'description', 'location'])
            course_entry_query = get_query(query_string,
                                    ['coursename', 'description', 'location'])
            user_entry_query = get_query(query_string,
                                    ['first_name', 'last_name'])
            event_results = Events.objects.filter(event_entry_query).distinct()[:limit]
            course_results = Courses.objects.filter(course_entry_query).distinct()[:limit]
            user_results = YouYodaUser.objects.filter(user_entry_query).exclude(is_trainer=False).exclude(is_active=False).distinct()[:limit]
            queryset_chain = list(chain(
                event_results,
                course_results,
                user_results
            ))
            qs_sorted = sorted(queryset_chain, key=lambda instance: instance.pk)
            self.count = len(qs_sorted)
            data_serialized = serializers.serialize('json', qs_sorted)

            data = json.loads(data_serialized)
            for obj in data:
                for field in PROTECTED_USER:
                    if obj['fields'].get(field):
                        del obj['fields'][field]
            response_data = {
                "data": data,
                "count": self.count
            }
            return Response(response_data)

        return Response({"data":{},"count": self.count})
