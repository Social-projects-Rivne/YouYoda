from django.contrib.auth.models import AbstractUser
from django.db import models


class Categories(models.Model):
    name = models.CharField(max_length=20)

class Roles(models.Model):
    name = models.CharField(max_length=20)

class UserStatuses(models.Model):
    status = models.CharField(max_length=40)

DEFAULT_ROLE_ID = 1
class YouYodaUser(AbstractUser):
    role_id = models.ForeignKey(Roles, default=DEFAULT_ROLE_ID, on_delete=models.CASCADE)
    hide_my_data = models.BooleanField(default=False)
    first_name = models.CharField(max_length=20, blank=True, null=True)
    last_name = models.CharField(max_length=20, blank=True, null=True)
    location = models.TextField(blank=True, null=True)
    username = models.CharField(max_length=20, unique=True)
    psalt = models.CharField(max_length=20)
    password = models.CharField(max_length=80)
    email = models.EmailField(unique=True)
    about_me = models.TextField(blank=True, null=True)
    birth_date = models.DateField(blank=True, null=True)
    phone_number = models.CharField(max_length=9, blank=True, null=True)
    avatar_url = models.CharField(max_length=80, blank=True, null=True)
    is_trainer = models.BooleanField()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'password']

class StatusHistory(models.Model):
    usr_stat_id = models.ForeignKey(UserStatuses)
    date = models.DateTimeField()
    user_id = models.ForeignKey(YouYodaUser)

class TrainerCertificates(models.Model):
    user_id = models.ForeignKey(YouYodaUser)
    description = models.TextField()
    image_url = models.CharField(max_length=80)

class Courses(models.Model):
    coursename = models.CharField(max_length=60)
    owner_id = models.ForeignKey(YouYodaUser)
    status = models.CharField(max_length=10)
    description = models.TextField()
    is_public = models.BooleanField()
    start_date = models.DateTimeField()
    duration = models.DurationField()
    rate = models.IntegerField()
    members_limit = models.IntegerField()
    category_id = models.ForeignKey(Categories)
    location = models.TextField()
    cover_url = models.CharField(max_length=80)

class CoursesSubscribers(models.Model):
    participant_id = models.ForeignKey(YouYodaUser)
    course_id = models.ForeignKey(Courses)
    completed = models.BooleanField()
    feedback = models.TextField()
    rate = models.IntegerField()

class Achievements(models.Model):
    course_id = models.ForeignKey(Courses)
    image_url = models.CharField(max_length=80)
    name = models.CharField(max_length=20)

class Events(models.Model):
    category_id = models.ForeignKey(Categories)
    name = models.CharField(max_length=60)
    description = models.TextField()
    owner_id = models.ForeignKey(YouYodaUser)
    date = models.DateTimeField()
    location = models.TextField()
    cover_url = models.CharField(max_length=80)

class EventsSubscribers(models.Model):
    participant_id = models.ForeignKey(YouYodaUser)
    event_id = models.ForeignKey(Events)