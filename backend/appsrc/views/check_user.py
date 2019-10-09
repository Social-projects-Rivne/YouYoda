from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView

from ..serializers.check_user_serializer import CheckUserSerializer


class CheckUser(APIView):
    """Checks user access rights by token param using CheckUserSerializer for getting user authorization and role status."""
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format='json'):
        """
        Checks user access rights by 'checkParam' request param.
        Returns data_status:
        - 'authorized' or error string - if we have received request 'authorized'
        - 'role' and role ID or error string - if we have received request 'role'
        """
        data_request=request.data
        serializer = CheckUserSerializer(data=data_request)
        if serializer.is_valid():
            user = serializer.validated_data
            if user.is_authenticated:
                if data_request['checkParam'] == "authorized":
                    return Response({'data_status': 'authorized'}, status=status.HTTP_200_OK)
                elif data_request['checkParam'] == "role":
                    return Response({'data_status': 'role', 'role': user.role_id}, status=status.HTTP_200_OK)
                elif data_request['checkParam'] == "is_trainer":
                    return Response({'data_status': 'is_trainer', 'is_trainer': user.is_trainer}, status=status.HTTP_200_OK)
                else:
                    return Response({'data_status': 'Error request: checkParam is not correct'}, status=status.HTTP_412_PRECONDITION_FAILED)
            else:
                return Response({'data_status': 'user is not authenticated'}, status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response({'data_status': 'data is not validated'}, status=status.HTTP_412_PRECONDITION_FAILED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
