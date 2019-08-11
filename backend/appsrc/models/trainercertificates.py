from django.db import models
from .user import User

class TrainerCertificates(models.Model):
    user = models.ForeignKey(User, default='', on_delete=models.CASCADE)
    description = models.TextField()
    image_url = models.CharField(max_length=80)
