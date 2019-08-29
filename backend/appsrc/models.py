from django.contrib.auth.models import AbstractUser
from django.db import models

DEFAULT_ROLE_ID = 1
DEFAULT_CATEGORIES_ID = 1
DEFAULT_RATE=0
DEFAULT_COST=0

class Categories(models.Model):
    name = models.CharField(max_length=20)

    def __str__(self):
        return "%s" % (self.name)

class Roles(models.Model):
    name = models.CharField(max_length=20)

    def __str__(self):
        return self.id

class UserStatuses(models.Model):
    status = models.CharField(max_length=40)

class YouYodaUser(AbstractUser):
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'password']
    role= models.ForeignKey(Roles, default=DEFAULT_ROLE_ID, on_delete=models.SET_DEFAULT)
    hide_my_data = models.BooleanField(default=False)
    first_name = models.CharField(max_length=20, blank=True, null=True)
    last_name = models.CharField(max_length=20, blank=True, null=True)
    location = models.TextField(blank=True, null=True)
    username = models.CharField(max_length=20, unique=True)
    password = models.CharField(max_length=80)
    email = models.EmailField(unique=True)
    about_me = models.TextField(blank=True, null=True)
    i_like = models.TextField(blank=True, null=True)
    birth_date = models.DateField(blank=True, null=True)
    phone_number = models.CharField(max_length=13, blank=True, null=True)
    avatar_url = models.CharField(max_length=80, blank=True, null=True)
    is_trainer = models.BooleanField(default=False)
    is_active = models.BooleanField(default=False, help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.', verbose_name='active')

    def __str__(self):
        return "%s %s" % (self.first_name, self.last_name)

class StatusHistory(models.Model):
    usr_stat_id = models.ForeignKey(UserStatuses, on_delete=models.CASCADE)
    date = models.DateTimeField()
    user_id = models.ForeignKey(YouYodaUser, on_delete=models.CASCADE)

class TrainerCertificates(models.Model):
    user_id = models.ForeignKey(YouYodaUser, on_delete=models.CASCADE)
    description = models.TextField()
    image_url = models.CharField(max_length=80)

class Courses(models.Model):
    coursename = models.CharField(max_length=60)
    owner = models.ForeignKey(YouYodaUser, on_delete=models.CASCADE)
    status = models.CharField(max_length=10)
    description = models.TextField(blank=True, null=True)
    is_public = models.BooleanField()
    start_date = models.DateTimeField(blank=False)
    duration = models.DurationField(blank=False)
    rate = models.IntegerField(default=DEFAULT_RATE)
    cost = models.IntegerField(default=DEFAULT_COST)
    members_limit = models.IntegerField(blank=True, null=True)
    categories = models.ForeignKey(Categories, default=DEFAULT_CATEGORIES_ID, on_delete=models.SET_DEFAULT)
    location = models.TextField(blank=True, null=True)
    cover_url = models.CharField(max_length=100)

class CoursesSubscribers(models.Model):
    participant_id = models.ForeignKey(YouYodaUser, on_delete=models.CASCADE)
    course_id = models.ForeignKey(Courses, on_delete=models.CASCADE)
    completed = models.BooleanField()
    feedback = models.TextField()
    rate = models.IntegerField()

class Achievements(models.Model):
    course_id = models.ForeignKey(Courses, on_delete=models.CASCADE)
    image_url = models.CharField(max_length=80)
    name = models.CharField(max_length=20)

class Events(models.Model):
    categories = models.ForeignKey(Categories, on_delete=models.SET_DEFAULT, default=DEFAULT_CATEGORIES_ID)
    name = models.CharField(max_length=60)
    description = models.TextField(blank=False)
    owner = models.ForeignKey(YouYodaUser, on_delete=models.CASCADE)
    date = models.DateTimeField(blank=False)
    location = models.TextField(blank=False)
    cover_url = models.CharField(max_length=80)

class EventsSubscribers(models.Model):
    participant_id = models.ForeignKey(YouYodaUser, on_delete=models.CASCADE)
    event_id = models.ForeignKey(Events, on_delete=models.CASCADE)
