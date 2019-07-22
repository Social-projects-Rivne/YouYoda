from django.db import models

class Courses(models.Model):
    coursename = models.CharField(max_length=60)
    owner_id = models.ForeignKey(User)
    status = models.CharField(max_length=10)
    description = models.TextField()
    is_public = models.BooleanField()
    start_date = models.DateTimeField()
    duration = models.DurationField()
    rate = models.IntegerField()
    members_limit = models.IntegerField()
    category_id = models.ForeignKey(Categories)
    location = models.TextField()
    cover_url = models.CharField(max_length=80)
