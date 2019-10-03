from django.contrib.auth.models import AbstractUser
from django.db import models

DEFAULT_ROLE_ID = 1
DEFAULT_CATEGORIES_ID = 1
DEFAULT_STATUS_ID = 1
DEFAULT_RATE=0
DEFAULT_COST=0

class Categories(models.Model):
    name = models.CharField(max_length=20)

    def __str__(self):
        return "%s" % (self.name)

class Roles(models.Model):
    name = models.CharField(max_length=20)

    def __str__(self):
        return self.name

class UserStatuses(models.Model):
    name = models.CharField(max_length=40)

class YouYodaUser(AbstractUser):
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'password']
    status = models.ForeignKey(UserStatuses, default=DEFAULT_STATUS_ID, on_delete=models.CASCADE)
    role = models.ForeignKey(Roles, default=DEFAULT_ROLE_ID, related_name='owner',on_delete=models.SET_DEFAULT)
    hide_my_data = models.BooleanField(default=False)
    first_name = models.CharField(max_length=20, blank=True, default='')
    last_name = models.CharField(max_length=20, blank=True, default='')
    location = models.TextField(blank=True, default='')
    username = models.CharField(max_length=20, unique=True)
    password = models.CharField(max_length=80)
    email = models.EmailField(unique=True)
    about_me = models.TextField(blank=True, default='')
    i_like = models.TextField(blank=True, default='')
    birth_date = models.DateField(blank=True, null=True)
    phone_number = models.CharField(max_length=13, blank=True, default='')
    avatar_url = models.CharField(max_length=255, blank=True, default='')
    is_trainer = models.BooleanField(default=False)
    is_active = models.BooleanField(default=False, help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.', verbose_name='active')

    def __str__(self):
        return "%s %s" % (self.first_name, self.last_name)

class StatusHistory(models.Model):
    usr_stat = models.ForeignKey(UserStatuses, on_delete=models.CASCADE)
    date = models.DateTimeField()
    user = models.ForeignKey(YouYodaUser, on_delete=models.CASCADE)

class UserRequests(models.Model):
    author = models.ForeignKey(YouYodaUser, on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now_add=True)
    status_code = models.CharField(max_length=3)
    comment = models.TextField(blank=True, null=True)

class TrainerCertificates(models.Model):
    user = models.ForeignKey(YouYodaUser, on_delete=models.CASCADE)
    description = models.TextField()
    image_url = models.CharField(max_length=80)

class Courses(models.Model):
    coursename = models.CharField(max_length=60)
    owner = models.ForeignKey(YouYodaUser, on_delete=models.CASCADE)
    status = models.CharField(max_length=50)
    description = models.TextField(blank=True, null=True)
    is_public = models.BooleanField()
    start_date = models.IntegerField(blank=False)
    duration = models.DurationField(blank=False)
    rate = models.IntegerField(default=DEFAULT_RATE)
    cost = models.IntegerField(default=DEFAULT_COST)
    members_limit = models.IntegerField(blank=True, null=True)
    categories = models.ForeignKey(Categories, default=DEFAULT_CATEGORIES_ID, on_delete=models.SET_DEFAULT)
    location = models.TextField(blank=True, null=True)
    cover_url = models.CharField(max_length=100)

class CoursesSubscribers(models.Model):
    participant = models.ForeignKey(YouYodaUser, on_delete=models.CASCADE)
    course = models.ForeignKey(Courses, on_delete=models.CASCADE, related_name="subscribed_course")
    completed = models.BooleanField(default=False)
    is_favourite = models.BooleanField(default=False)
    rate = models.IntegerField(default=DEFAULT_RATE)

class Achievements(models.Model):
    course = models.ForeignKey(Courses, on_delete=models.CASCADE)
    image_url = models.CharField(max_length=80, blank=False)
    name = models.CharField(max_length=20)

class UsersAchievements(models.Model):
    participant = models.ForeignKey(YouYodaUser, on_delete=models.CASCADE)
    achievement = models.ForeignKey(Achievements, on_delete=models.CASCADE, related_name="user_achievements")

class Events(models.Model):
    categories = models.ForeignKey(Categories, on_delete=models.SET_DEFAULT, default=DEFAULT_CATEGORIES_ID)
    name = models.CharField(max_length=60)
    description = models.TextField(blank=False)
    owner = models.ForeignKey(YouYodaUser, on_delete=models.CASCADE)
    date = models.IntegerField(blank=False)
    location = models.TextField(blank=False)
    cover_url = models.CharField(max_length=80, blank=True, null=True)

class EventsSubscribers(models.Model):
    participant = models.ForeignKey(YouYodaUser, on_delete=models.CASCADE)
    event = models.ForeignKey(Events, on_delete=models.CASCADE, related_name="subscribed_event")
    completed = models.BooleanField(default=False)

class CoursesComments(models.Model):
    author = models.ForeignKey(YouYodaUser, related_name='user_details', on_delete=models.CASCADE)
    course = models.ForeignKey(Courses, on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now_add=True)
    comment = models.TextField(blank=True, null=True)

class EventsComments(models.Model):
    author = models.ForeignKey(YouYodaUser, on_delete=models.CASCADE)
    event = models.ForeignKey(Events, on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now_add=True)
    comment = models.TextField(blank=True, null=True)

class PDPNotes(models.Model):
    author = models.ForeignKey(YouYodaUser, on_delete=models.CASCADE)
    title = models.CharField(max_length=60)
    description = models.TextField(blank=True, null=True)
    start = models.IntegerField(blank=False)
    end = models.IntegerField(blank=False)
    cover_url = models.TextField(blank=True, null=True)
    status = models.CharField(max_length=50)

class CourseSchedule(models.Model):
    course = models.ForeignKey(Courses, related_name='course_schedule', on_delete=models.CASCADE)
    date = models.IntegerField(blank=False)
