from django.db import models

class TrainerCertificates(models.Model):
    user_id = models.ForeignKey(User)
    description = models.TextField()
    image_url = models.CharField(max_length=80)
