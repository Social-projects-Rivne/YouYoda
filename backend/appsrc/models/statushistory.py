from django.db import models
from .user import User
from .userstatuses import UserStatuses

class StatusHistory(models.Model):
    status = models.ForeignKey(UserStatuses, default='', on_delete=models.CASCADE)
    date = models.DateTimeField()
    user = models.ForeignKey(User, default='', on_delete=models.CASCADE)
