from django.db import models
from .courses import Courses
from .user import User

class CoursesSubscribers(models.Model):
    participant = models.ForeignKey(User, default='', on_delete=models.CASCADE)
    course = models.ForeignKey(Courses, default='', on_delete=models.CASCADE)
    completed = models.BooleanField()
    feedback = models.TextField()
    rate = models.IntegerField()
