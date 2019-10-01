from django.db.models import Count
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from django.conf import settings
from django.core.cache.backends.base import DEFAULT_TIMEOUT
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page

from ..models import YouYodaUser, Courses, Events, TrainerCertificates
from ..serializers.trainer_serializer import (
                                                TrainerInfoSerializer,
                                                TrainerCoursesSerializer,
                                                TrainerEventsSerializer,
                                                TrainerCertificatesSerializer,
                                                TopTrainerSerializer)


NUMBER_OF_TOP = 4
CACHE_TTL = getattr(settings, 'CACHE_TTL', DEFAULT_TIMEOUT)

class TopTrainers(APIView):
    """Takes data from CoursesTopSerializator for view top rate courses"""

    permission_classes = [permissions.AllowAny,]

    @method_decorator(cache_page(CACHE_TTL), name='top_trainers')
    def get(self, request):
        """First check request data in cache, then pull data from db"""
        owners_courses = Courses.objects.values('owner').annotate(count=Count('owner')).order_by('-count')[:NUMBER_OF_TOP]
        id_owners = [owner_courses['owner'] for owner_courses in owners_courses]
        trainers = YouYodaUser.objects.filter(id__in = id_owners)
        serializer = TopTrainerSerializer(trainers, many=True)
        return Response(serializer.data)


class TrainerPage(APIView):
    """Takes data from TrainerSerializer for view trainer page"""

    permission_classes = [permissions.AllowAny,]

    def get(self, request):
        """Get id of trainer in params and return info about trainer"""
        trainer_id = request.query_params.get('id')
        trainer = YouYodaUser.objects.get(id = trainer_id)
        courses = Courses.objects.filter(owner = trainer_id)
        events = Events.objects.filter(owner = trainer_id)
        certificates = TrainerCertificates.objects.filter(user = trainer_id)
        serializer_trainer_info = TrainerInfoSerializer(trainer)
        serializer_trainer_courses = TrainerCoursesSerializer(courses, many=True)
        serializer_trainer_events = TrainerEventsSerializer(events, many=True)
        serializer_trainer_certificates = TrainerCertificatesSerializer(certificates, many=True)
        response_data = {
            "trainer": serializer_trainer_info.data,
            "courses": serializer_trainer_courses.data,
            "events": serializer_trainer_events.data,
            "certificates": serializer_trainer_certificates.data
        }
        return Response(response_data)
