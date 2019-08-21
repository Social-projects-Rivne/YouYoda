from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView

from ..serializers.check_user_serializer import CheckUserSerializer


class CheckUser(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format='json'):
        data_request=request.data
        serializer = CheckUserSerializer(data=data_request)
        if serializer.is_valid():
            user = serializer.validated_data
            if user.is_authenticated:
                if data_request['checkParam'] == "authorized":
                    return Response({'data_status': 'authorized'}, status=status.HTTP_200_OK)
                elif data_request['checkParam'] == "role":
                    return Response({'data_status': 'role', 'role': user.role_id}, status=status.HTTP_200_OK)
                else:
                    return Response({'data_status': 'Error request: checkParam is not correct'}, status=status.HTTP_412_PRECONDITION_FAILED)
            else:
                return Response({'data_status': 'user is not authenticated'}, status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response({'data_status': 'data is not validated'}, status=status.HTTP_412_PRECONDITION_FAILED)    
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)