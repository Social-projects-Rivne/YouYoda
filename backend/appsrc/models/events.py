from django.db import models

class Events(models.Model):
    category_id = models.ForeignKey(Categories)
    name = models.CharField(max_length=60)
    description = models.TextField()
    owner_id = models.ForeignKey(User)
    date = models.DateTimeField()
    location = models.TextField()
    cover_url = models.CharField(max_length=80)
