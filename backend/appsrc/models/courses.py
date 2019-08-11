from django.db import models
from .categories import Categories
from .user import User

class Courses(models.Model):
    coursename = models.CharField(max_length=60)
    owner = models.ForeignKey(User, default='', on_delete=models.CASCADE)
    status = models.CharField(max_length=10)
    description = models.TextField()
    is_public = models.BooleanField()
    start_date = models.DateTimeField()
    duration = models.DurationField()
    rate = models.IntegerField()
    members_limit = models.IntegerField()
    category = models.ForeignKey(Categories, default='', on_delete=models.CASCADE)
    location = models.TextField()
    cover_url = models.CharField(max_length=80)
