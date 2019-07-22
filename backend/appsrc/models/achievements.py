from django.db import models

class Achievements(models.Model):
    course_id = models.ForeignKey(Courses)
    image_url = models.CharField(max_length=80)
    name = models.CharField(max_length=20)
    