from django.db import models

class EventsSubscribers(models.Model):
    participant_id = models.ForeignKey(User)
    event_id = models.ForeignKey(Events)
