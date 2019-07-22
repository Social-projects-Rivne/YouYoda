from django.db import models

class UserRegistrationTokens(models.Model):
    user_id = models.ForeignKey(User)
    token = image_url = models.CharField(max_length=80)
    exp_date = models.DateTimeField()
    tokenstatus = models.CharField(max_length=10)
