from django.db import models
from .roles import Roles


DEFAULT_ROLE_ID = 1
class User(models.Model):
    role_id = models.ForeignKey(Roles, default=DEFAULT_ROLE_ID, on_delete=models.CASCADE)
    hide_my_data = models.BooleanField()
    first_name = models.CharField(max_length=20)
    last_name = models.CharField(max_length=20)
    location = models.TextField()
    username = models.CharField(max_length=20)
    password = models.CharField(max_length=40)
    email = models.EmailField()
    about_me = models.TextField()
    birth_date = models.DateField()
    phone_number = models.CharField(max_length=13)
    is_active = models.BooleanField()
    avatar_url = models.CharField(max_length=80)
    is_trainer = models.BooleanField()
