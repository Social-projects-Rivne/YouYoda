import datetime

from django.shortcuts import get_object_or_404
from rest_framework import generics
from rest_framework import status
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView

from ..models import YouYodaUser, Courses, Categories, CoursesSubscribers
from ..serializers.courses_serializer import CoursesSerializator
from ..serializers.manage_course_serializer import ManageCourseSerializer
from ..serializers.courses_serializer import PostCourseScheduleSerializer


class ManageCourse(APIView):
    """Takes data from ManageCourseSerializer and CoursesSerializator for manage courses."""

    permission_classes = [permissions.IsAuthenticated,]

    def get(self, request):
        """Receives and transmits trainer courses"""
        trainer = YouYodaUser.objects.get(auth_token=request.headers['Authorization'].replace('Token ', ''))
        trainer_courses = Courses.objects.filter(owner_id=trainer.id)
        courses_serializer = CoursesSerializator(trainer_courses, many=True)
        return Response(courses_serializer.data)

    def patch(self, request):
        """Receives and updates course"""
        course_data = request.data
        course = get_object_or_404(Courses, id=course_data['id'])
        category = Categories.objects.get(name=course_data['categories'])
        course_data['categories'] = category.id
        course_serializer = ManageCourseSerializer(course, data=course_data, partial=True)

        if course_data['status'] == 'Closed':
            subscribers = CoursesSubscribers.objects.filter(course_id=course_data['id']).update(completed=True)

        if course_serializer.is_valid():
            course_serializer.save()
            return Response(course_serializer.data, status=status.HTTP_201_CREATED)

        return Response(course_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def post(self, request):
        """Receives and create new course"""
        course_data = request.data
        trainer = YouYodaUser.objects.get(auth_token=request.headers['Authorization'].replace('Token ', ''))
        course_data['duration'] = datetime.timedelta(hours=int(request.data['duration']))
        course_data['owner'] = trainer.id
        course_serializer = ManageCourseSerializer(data=course_data)

        if course_serializer.is_valid():
            course_serializer.save()
            date_list = [{"date": course_date, "course": course_serializer.data['id']} for course_date in course_data['course_schedule']]
            scheduled_serializer = PostCourseScheduleSerializer(data=date_list, many=True, partial=True)
            if scheduled_serializer.is_valid():
                scheduled_serializer.save()
                return Response(course_serializer.data, status=status.HTTP_201_CREATED)

        return Response(course_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request):
        """Receives and delete course"""
        course = get_object_or_404(Courses, id=request.data.get('id'))
        deleted_course = Courses.objects.filter(id=course.id).delete()

        if deleted_course:
            return Response(status=status.HTTP_204_NO_CONTENT)

        return Response(status=status.HTTP_400_BAD_REQUEST)
