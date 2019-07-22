from django.db import models

class UserStatuses(models.Model):
    status = models.CharField(max_length=10)
