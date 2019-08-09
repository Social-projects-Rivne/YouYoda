from django.db import models

from appsrc.models.user import User

class Roles(models.Model):
	role = models.ForeignKey(User, default='', on_delete=models.CASCADE)
    # role = models.CharField(max_length=20, null=True)
	name = models.CharField(max_length=20)
