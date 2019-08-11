from django.db import models
from .roles import Roles

DEFAULT_ROLE_ID = 1
class User(models.Model):
    role = models.ForeignKey(Roles, default=DEFAULT_ROLE_ID, on_delete=models.CASCADE)
    hide_my_data = models.BooleanField(default=False)
    first_name = models.CharField(max_length=20, blank=True, null=True)
    last_name = models.CharField(max_length=50, blank=True, null=True)
    location = models.TextField(blank=True, null=True)
    username = models.CharField(unique=True)
    password = models.CharField(max_length=80)
    email = models.EmailField(unique=True)
    about_me = models.TextField(blank=True, null=True)
    birth_date = models.DateField(blank=True, null=True)
    phone_number = models.CharField(max_length=13, blank=True, null=True)
    is_active = models.BooleanField(default=True)
    avatar_url = models.CharField(max_length=80, blank=True, null=True)
    is_trainer = models.BooleanField(default=False)
