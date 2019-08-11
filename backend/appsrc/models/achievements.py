from django.db import models
from .courses import Courses

class Achievements(models.Model):
    course = models.ForeignKey(Courses, default='', on_delete=models.CASCADE)
    image_url = models.CharField(max_length=80)
    name = models.CharField(max_length=20)
    