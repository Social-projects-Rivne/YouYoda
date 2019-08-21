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
            if data_request['checkParam'] == "authorized":
                if user.is_authenticated:
                    return Response({'data_status': 'authorized'}, status=status.HTTP_200_OK)
                else:
                    return Response({'data_status': False}, status=status.HTTP_200_OK)
            else:
                return Response({'data_status': 'no checkParam'}, status=status.HTTP_200_OK)
            if data_request['checkParam'] == "role":
                return Response({'role': 'role'}, status=status.HTTP_200_OK)
        else:
            return Response({'data_status': 'data is not validated'}, status=status.HTTP_200_OK)    
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)