from rest_framework.parsers import FileUploadParser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from django.core.files.storage import FileSystemStorage

from ..models import YouYodaUser
from ..serializers.profile_edit_serializer import ProfileEditSerializer


class FileUploadView(APIView):
    parser_class = (FileUploadParser,)

    def post(self, request, *args, **kwargs):
        # import pdb;
        # pdb.set_trace()

        myfile = request.FILES['file']
        fs = FileSystemStorage()
        filename = fs.save(myfile.name, myfile)
        uploaded_file_url = fs.url(filename)
        # user = YouYodaUser.objects.get(auth_token=request.headers['Authorization'].replace('Token ', ''))
        # serializer = ProfileEditSerializer(user, data=uploaded_file_url, partial=True)
        # if serializer.is_valid():
        #     serializer.save()
        #     # return Response(serializer.data.avatar_url, status=status.HTTP_201_CREATED)
        #     # return Response({'avatar_url': uploaded_file_url}, status=status.HTTP_201_CREATED)
        # return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        # return Response({'filepath': uploaded_file_url}, status=status.HTTP_201_CREATED)
        return Response({'avatar_url': uploaded_file_url}, status=status.HTTP_201_CREATED)

# def get(self, request):
#     """Receives and transmits user profile data"""
#     user = YouYodaUser.objects.get(auth_token=request.headers['Authorization'].replace('Token ', ''))
#     serializer = ProfileEditSerializer(user)
#     return Response(serializer.data.avatar_url)
#
# def patch(self, request, *args, **kwargs):
#     """Receives and updates user profile data"""
#     # user= get_object_or_404(YouYodaUser, email=request.data.get('email'))
#     user = YouYodaUser.objects.get(auth_token=request.headers['Authorization'].replace('Token ', ''))
#     serializer = ProfileEditSerializer(user, data=request.data, partial=True)
#     if serializer.is_valid():
#         serializer.save()
#         return Response(serializer.data.avatar_url, status=status.HTTP_201_CREATED)
#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
