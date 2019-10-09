import os

from rest_framework.parsers import FileUploadParser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from django.core.files.storage import FileSystemStorage
from PIL import Image


class FileUploadView(APIView):
    """Updates path of users avatar in DB"""
    parser_class = (FileUploadParser,)

    def post(self, request, *args, **kwargs):

        file_object = request.FILES['file']
        file_storage = FileSystemStorage()
        filename = file_storage.save(file_object.name, file_object)
        uploaded_file_url = file_storage.url(filename)
        path = (os.path.abspath(uploaded_file_url[1:]))
        try:
            img = Image.open(path)
        except (IOError, SyntaxError) as e:
            return Response('Bad file :', status=status.HTTP_400_BAD_REQUEST)
        return Response({'avatar_url': uploaded_file_url}, status=status.HTTP_201_CREATED)
