from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status

from ..models import CoursesSubscribers, YouYodaUser, Courses
from ..serializers.courses_subscribers_serializer import CoursesSubscribersSerializator, FavoriteCoursesSerializator


class UserSubscribeToCourse(APIView):
    """Takes data from CoursesSubscribersSerializator for add user to course"""

    permission_classes = [permissions.IsAuthenticated,]

    def post(self, request):
        """Push user, course to db with CoursesSubscribersSerializator"""
        data_course=request.data
        auth_token = request.headers['Authorization'].replace('Token ', '')
        user = YouYodaUser.objects.get(auth_token=auth_token)
        course = Courses.objects.get(id = data_course['course_id'])
        data_course['participant'] = user.id
        data_course['course'] = course.id
        course_add = CoursesSubscribers.objects.filter(
                            participant = data_course['participant'],
                            course = data_course['course'])

        if course_add:
            msg = "You have already subscribed to this course!"
            return Response(msg, status=status.HTTP_208_ALREADY_REPORTED)
        else:
            serializer = CoursesSubscribersSerializator(data=data_course)
            if serializer.is_valid():
                course_add = serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ManageFavoriteCoursesProfile(APIView):
 
    permission_classes = [permissions.IsAuthenticated,]

    def patch(self, request):
        """ """
        user = YouYodaUser.objects.get(auth_token=request.headers['Authorization'].replace('Token ', ''))
        data_to_update = request.data
        subscribed_course = CoursesSubscribers.objects.get(course_id=data_to_update['course'], participant_id=user.id)
        #data_to_update['participant'] = user.id
        if subscribed_course:
            #data_to_update['id'] = subscribed_course.id
            serializer = FavoriteCoursesSerializator(subscribed_course, data=data_to_update, partial=True)
            if serializer.is_valid():
                subscribe = serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
