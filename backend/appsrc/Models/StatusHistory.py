from django.db import models

class StatusHistory(models.Model):
    usr_stat_id = models.ForeignKey(UserStatuses)
    date = models.DateTimeField()
    user_id = models.ForeignKey(User)
