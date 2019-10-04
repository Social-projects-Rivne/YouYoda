from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status

from ..models import CoursesSubscribers, YouYodaUser, Courses, CourseSchedule
from ..serializers.courses_subscribers_serializer import CoursesSubscribersPostSerializator, FavoriteCoursesSerializator
from ..serializers.courses_serializer import CourseScheduleSerializer


class UserSubscribeToCourse(APIView):
    """Takes data from CoursesSubscribersPostSerializator for add user to course"""

    permission_classes = [permissions.IsAuthenticated,]

    def post(self, request):
        """Push user, course to db with CoursesSubscribersPostSerializator"""
        data_course=request.data
        auth_token = request.headers['Authorization'][6:]
        user = YouYodaUser.objects.get(auth_token=auth_token)
        course = Courses.objects.get(id = data_course['course_id'])
        data_course['participant_id'] = user.id
        data_course['course_id'] = course.id
        course_add = CoursesSubscribers.objects.filter(
                            participant = data_course['participant_id'],
                            course = data_course['course_id'])

        if course_add:
            msg = "You have already subscribed to this course!"
            return Response(msg, status=status.HTTP_208_ALREADY_REPORTED)
        else:
            serializer = CoursesSubscribersPostSerializator(data=data_course)
            if serializer.is_valid():
                course_add = serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        """Receives and transmits user course data and schedule data about these courses"""
        auth_token = request.headers['Authorization'][6:]
        user = YouYodaUser.objects.get(auth_token=auth_token)
        user_courses = CoursesSubscribers.objects.filter(participant = user.id)
        list_id_courses = [user_course.course for user_course in user_courses]
        schedule_courses = CourseSchedule.objects.filter(course__in = list_id_courses).order_by('date')
        serializer = CourseScheduleSerializer(schedule_courses, many=True)
       
        return Response(serializer.data)


class CheckSubscribeToCourse(APIView):
    """Checking user subscription to course"""

    permission_classes = [permissions.IsAuthenticated,]

    def get(self, request):
        """Method for check status user subscription to course by course ID"""
        course_id = request.query_params.get('course_id')
        auth_token = request.headers['Authorization'].replace('Token ', '')
        user = YouYodaUser.objects.get(auth_token=auth_token)
        course_data = CoursesSubscribers.objects.get(
            participant = user.id,
            course = int(course_id),
        )
        if course_data:
            if course_data.completed is True:
                return Response('completed', status=status.HTTP_208_ALREADY_REPORTED)
            else:
                return Response(True, status=status.HTTP_208_ALREADY_REPORTED)
        else:
            return Response(False, status=status.HTTP_204_NO_CONTENT)
        
        return Response(False, status=status.HTTP_400_BAD_REQUEST)


class UserUnsubscribeCourse(APIView):
    """Method for user unsubscription to courses"""

    permission_classes = [permissions.IsAuthenticated,]

    def delete(self, request):
        """Gets data from request, searches in database and deletes user subscribes to courses"""
        auth_token = request.headers['Authorization'].replace('Token ', '')
        user = YouYodaUser.objects.get(auth_token=auth_token)
        course_delete = CoursesSubscribers.objects.filter(
            participant = user.id,
            course = int(request.GET['course']),
        )
        if course_delete:
            course_delete.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)

        return Response(False, status=status.HTTP_400_BAD_REQUEST)


class ManageFavoriteCoursesProfile(APIView):
 
    permission_classes = [permissions.IsAuthenticated,]

    def patch(self, request):
        """ """
        user = YouYodaUser.objects.get(auth_token=request.headers['Authorization'].replace('Token ', ''))
        data_to_update = request.data
        subscribed_course = CoursesSubscribers.objects.get(course_id=data_to_update['course'], participant_id=user.id)
        if subscribed_course:
            serializer = FavoriteCoursesSerializator(subscribed_course, data=data_to_update, partial=True)
            if serializer.is_valid():
                subscribe = serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
