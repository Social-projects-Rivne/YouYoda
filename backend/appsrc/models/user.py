from .roles import Roles

from django.contrib.auth.models import AbstractUser
from django.db import models


DEFAULT_ROLE_ID = 1
class User(AbstractUser):
    role_id = models.ForeignKey(Roles, default=DEFAULT_ROLE_ID, on_delete=models.CASCADE)
    hide_my_data = models.BooleanField(default=False)
    first_name = models.CharField(max_length=20, blank=True, null=True)
    last_name = models.CharField(max_length=20, blank=True, null=True)
    location = models.TextField(blank=True, blank=True, null=True)
    username = models.CharField(max_length=20, unique=True)
    psalt = models.CharField(max_length=20)
    password = models.CharField(max_length=80)
    email = models.EmailField(unique=True)
    about_me = models.TextField(blank=True, null=True)
    birth_date = models.DateField(blank=True, null=True)
    phone_number = models.CharField(max_length=9, blank=True, null=True)
    is_active = models.BooleanField(default=True)
    avatar_url = models.CharField(max_length=80, blank=True, null=True)
    is_trainer = models.BooleanField()
