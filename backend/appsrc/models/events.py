from django.db import models
from .categories import Categories
from .user import User

class Events(models.Model):
    category = models.ForeignKey(Categories, default='', on_delete=models.CASCADE)
    name = models.CharField(max_length=60)
    description = models.TextField()
    owner = models.ForeignKey(User, default='', on_delete=models.CASCADE)
    date = models.DateTimeField()
    location = models.TextField()
    cover_url = models.CharField(max_length=80)
