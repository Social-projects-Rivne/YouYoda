from django.db import models

class Roles(models.Model):
    name = models.CharField(max_length=20)
