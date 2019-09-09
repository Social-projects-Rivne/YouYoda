from rest_framework.views import APIView
from django.core import serializers
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from ..models import YouYodaUser, CoursesSubscribers, Courses
from ..serializers.profile_view_serializer import ProfileViewSerializer
from ..serializers.user_courses_serializer import UserCoursesSerializer
from ..serializers.courses_serializer import CoursesTopSerializator


class ViewProfile(APIView):
    """Takes data from ProfileViewSerializer for view user profile."""

    permission_classes = [permissions.IsAuthenticated,]
    # permission_classes = [permissions.AllowAny,]

    def get(self, request):
        """Receives and transmits user profile data"""
        user = YouYodaUser.objects.get(auth_token=request.headers['Authorization'].replace('Token ', ''))
        # subscribed_courses = CoursesSubscribers.objects.filter(participant_id=user.id)
        user_courses = Courses.objects.filter(subscribed_course__participant_id=user.id)
        courses_serializer = UserCoursesSerializer(user_courses, many=True)
        # courses = serializers.serialize('json', CoursesSubscribers.objects.filter(participant_id=user.id), fields=('feedback','rate', 'course_id'))
        # import pdb; pdb.set_trace()
        # serializer = ProfileViewSerializer(user)
        # detail_courses=[]
        # for dict in courses_serializer.data:
        #     for detail, value in dict.items():
        #         if detail == 'course_id':
        #             for s in value:
        #                 if s.isdigit():
        #                     detail_courses.append(Courses.objects.get(id=int(s)))
        # detail_serializer = CoursesTopSerializator(detail_courses, many=True)
        response=courses_serializer.data
        # response['courses'] = courses
        # response['details'] = detail_serializer.data
        return Response(response)
