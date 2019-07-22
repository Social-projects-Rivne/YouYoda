from django.db import models

class Categories(models.Model):
    name = models.CharField(max_length=20)
