from django.db import models

class CoursesSubscribers(models.Model):
    participant_id = models.ForeignKey(User)
    course_id = models.ForeignKey(Courses)
    completed = models.BooleanField()
    feedback = models.TextField()
    rate = models.IntegerField()
