from django.shortcuts import get_object_or_404
from rest_framework import generics
from rest_framework import status
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView

from ..models import YouYodaUser, Courses, Categories
from ..serializers.courses_serializer import CoursesSerializator
from ..serializers.manage_course_serializer import ManageCourseSerializer


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
        course = get_object_or_404(Courses, id=request.data.get('id'))
        category = Categories.objects.get(name=course_data['categories'])
        trainer = YouYodaUser.objects.get(auth_token=request.headers['Authorization'].replace('Token ', ''))
        course_data['categories'] = category.id
        course_data['owner'] = trainer.id
        course_serializer = ManageCourseSerializer(course, data=request.data, partial=True)

        if course_serializer.is_valid():
            course_serializer.save()
            return Response(course_serializer.data, status=status.HTTP_201_CREATED)

        return Response(course_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def post(self, request):
        """Receives and create new course"""
        course_data = request.data
        trainer = YouYodaUser.objects.get(auth_token=request.headers['Authorization'].replace('Token ', ''))
        category = Categories.objects.get(name=course_data['categories'])
        course_data['categories'] = category.id
        course_data['owner'] = trainer.id
        course_serializer = ManageCourseSerializer(data=course_data)

        if course_serializer.is_valid():
            course_serializer.save()
            return Response(course_serializer.data, status=status.HTTP_201_CREATED)

        return Response(course_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request):
        """Receives and delete course"""
        course = get_object_or_404(Courses, id=request.data.get('id'))
        deleted_course = Courses.objects.filter(id=course.id).delete()

        if deleted_course:
            return Response(status=status.HTTP_201_CREATED)

        return Response(status=status.HTTP_400_BAD_REQUEST)
