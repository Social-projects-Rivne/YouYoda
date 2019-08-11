from django.db import models
from .user import User

class UserRegistrationTokens(models.Model):
    user = models.ForeignKey(User, default='', on_delete=models.CASCADE)
    token = models.CharField(max_length=80)#image_url = 
    exp_date = models.DateTimeField()
    tokenstatus = models.CharField(max_length=10)
