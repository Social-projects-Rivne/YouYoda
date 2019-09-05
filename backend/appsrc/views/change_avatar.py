from rest_framework.parsers import FileUploadParser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from django.core.files.storage import FileSystemStorage


class FileUploadView(APIView):
    """Updates path of users avatar in DB"""
    parser_class = (FileUploadParser,)

    def post(self, request, *args, **kwargs):
        file_object = request.FILES['file']
        fs = FileSystemStorage()
        filename = fs.save(file_object.name, file_object)
        uploaded_file_url = fs.url(filename)

        return Response({'avatar_url': uploaded_file_url}, status=status.HTTP_201_CREATED)
