from django.core import mail
from django.conf import settings
from django.shortcuts import get_object_or_404
from djoser.compat import get_user_email
from rest_framework import status
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.views import APIView

from ..models import YouYodaUser, UserRequests
from ..serializers.user_to_trainer_serializer import UserToTrainerSerializer, UserRequestsSerializer


STATUS_NEW, STATUS_APPROVED, STATUS_REJECTED = 'N', 'A', 'R'
IS_ADMIN = 3
IS_MODERATOR = 2

class UserToTrainer(APIView):
	"""Takes data from UserToTrainerSerializer for change user role."""

	permission_classes = [permissions.IsAuthenticated,]

	def patch(self, request):
		"""Receives and updates user role"""
		status_code = None
		comments_data = request.data.get('data_obj')
		user_ids = request.data.get('id')
		user_data = {
			'is_trainer': request.data.get('is_trainer')
		}
		if 'status_code' in request.data:
			status_code = request.data.get('status_code')
		if status_code is not None and status_code in (STATUS_APPROVED, STATUS_REJECTED):
			for req_key in comments_data:
				request_data = UserRequests.objects.get(id=comments_data[req_key]['id'], status_code=STATUS_NEW)
				if request_data and request_data.author_id in user_ids:
					user_data['id'] = request_data.author_id
					user = get_object_or_404(YouYodaUser, id=user_data['id'])
					serializer = UserToTrainerSerializer(user, data=user_data, partial=True)
					if serializer.is_valid():
						serializer.save()
						request_data.status_code = status_code
						request_data.comment = comments_data[req_key]['comment']
						request_data.save(update_fields=['status_code','comment'])
						with mail.get_connection() as connection:
							status_text = 'changed'
							if status_code == STATUS_APPROVED:
								status_text = 'approved'
							elif status_code == STATUS_REJECTED:
								status_text = 'rejected'
							subject = 'Results of reviewing your request'
							body_text = 'Your request to become a trainer was '+str(status_text)+'.\n'
							if len(comments_data[req_key]['comment']) > 0:
								body_text += '\n'+str(comments_data[req_key]['comment'])
							to_email = [get_user_email(user)]
							mail.EmailMessage(
								subject, body_text, settings.DEFAULT_FROM_EMAIL, to_email,
								connection=connection,
							).send()
			return Response(serializer.data, status=status.HTTP_201_CREATED)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserSendRequest(APIView):
	"""Add data to UserRequestsSerializer for moderation user role."""

	permission_classes = [permissions.IsAuthenticated,]

	def post(self, request):
		"""Post request to database"""
		user = get_object_or_404(YouYodaUser, email=request.data.get('email'))
		if user:
			request_is = UserRequests.objects.filter(author_id=user.id, status_code=STATUS_NEW)
			if request_is:
				return Response('Request was already sent. Please, wait for results.', status=status.HTTP_208_ALREADY_REPORTED)
			validated_data = {'author': user.id, 'status_code': STATUS_NEW}
			serializer = UserRequestsSerializer(data=validated_data)
			if serializer.is_valid():
				serializer.save()
				return Response(serializer.data, status=status.HTTP_201_CREATED)
			return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserGetRequest(APIView):
	"""Get data for moderator and admin"""

	permission_classes = [permissions.IsAuthenticated,]

	def get(self, request, format=None):
		""" Get requests data by token and role access """
		auth_token = request.headers['Authorization'].replace('Token ', '')
		user = YouYodaUser.objects.get(auth_token=auth_token)
		status_code = None
		if 'status_code' in request.GET:
			status_code = request.GET['status_code']
		# if user is admin or moderator and active, let him to get data
		if((user.role_id == IS_ADMIN or user.role_id == IS_MODERATOR) and user.is_active):
			col = ['id', 'author_id', 'date', 'status_code', 'comment', 'author__first_name', 'author__last_name']
			if status_code is not None and status_code in (STATUS_NEW, STATUS_APPROVED, STATUS_REJECTED):
				requests = UserRequests.objects.select_related('author').filter(status_code=status_code).values(*col)
			else:
				requests = UserRequests.objects.select_related('author').all().values(*col)
			requests_list = list(requests)
			return Response(requests_list, status=status.HTTP_200_OK)
		return Response('Access error', status=status.HTTP_400_BAD_REQUEST)
