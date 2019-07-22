from django.db import models

# Create your models here.

class Users(models.Model):
	id = 
    name = models.UUIDField(primary_key=True)
    
class Events(models.Model):
    pass

class Courses(models.Model):
    pass

class PDP(models.Model):
    pass

class Roles(models.Model):
    pass

class UserStatus(models.Model):
    pass

class StatusHistory(models.Model):
    pass

class EventsSubscribers(models.Model):
    pass

class TrainersCertificates(models.Model):
    pass

class CoursesSubscribers(models.Model):
    pass

class Achievements(models.Model):
    pass

class UserRegistrationTokens(models.Model):
    pass

class Categories(models.Model):
    pass

