from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions

from ..models import YouYodaUser, Courses, Events, TrainerCertificates
from ..serializers.trainer_serializer import (
                                                TrainerInfoSerializer,
                                                TrainerCoursesSerializer,
                                                TrainerEventsSerializer,
                                                TrainerCertificatesSerializer)


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
