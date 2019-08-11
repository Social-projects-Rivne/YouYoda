from django.db import models
from .user import User
from .events import Events

class EventsSubscribers(models.Model):
    participant = models.ForeignKey(User, default='', on_delete=models.CASCADE)
    event = models.ForeignKey(Events, default='', on_delete=models.CASCADE)
