import os

from rest_framework.parsers import FileUploadParser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from django.core.files.storage import FileSystemStorage
from PIL import Image, ImageFilter
from datetime import datetime
from datetime import *


class FileUploadView(APIView):
    """Updates path of users avatar in DB"""
    parser_class = (FileUploadParser,)

    def post(self, request, *args, **kwargs):

        file_object = request.FILES['file']
        fs = FileSystemStorage()
        filename = fs.save(file_object.name, file_object)
        uploaded_file_url = fs.url(filename)
        pa = (os.path.abspath(uploaded_file_url[1:]))
        try:
            img = Image.open(pa)  # open the image file
        except (IOError, SyntaxError) as e:
            return Response('Bad file motherFu*ker:', status=status.HTTP_400_BAD_REQUEST)
        return Response({'avatar_url': uploaded_file_url}, status=status.HTTP_201_CREATED)
