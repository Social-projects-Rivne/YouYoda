from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status

from ..models import CoursesSubscribers, YouYodaUser, Courses
from ..serializers.courses_subscribers_serializer import CoursesSubscribersSerializator


class UserSubscribeToCourse(APIView):
    """Takes data from CoursesSubscribersSerializator for add user to course"""

    permission_classes = [permissions.IsAuthenticated,]

    def post(self, request):
        """Push user, course to db with CoursesSubscribersSerializator"""
        data_course=request.data
        auth_token = request.headers['Authorization'].replace('Token ', '')
        user = YouYodaUser.objects.get(auth_token=auth_token)
        course = Courses.objects.get(id = data_course['course_id'])
        data_course['participant_id'] = user.id
        data_course['course_id'] = course.id
        course_add = CoursesSubscribers.objects.filter(
                            participant_id = data_course['participant_id'], 
                            course_id = data_course['course_id'])

        if course_add:
            msg = "You have already subscribed to this course!"
            return Response(msg, status=status.HTTP_208_ALREADY_REPORTED)
        else:
            serializer = CoursesSubscribersSerializator(data=data_course)
            if serializer.is_valid():
                course_add = serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
