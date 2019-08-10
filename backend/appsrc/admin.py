from django.contrib import admin

# Register your models here.
from appsrc.models.user import User
from appsrc.models.roles import Roles
from appsrc.models.userstatuses import UserStatuses
from appsrc.models.statushistory import StatusHistory
from appsrc.models.userregistrationtokens import UserRegistrationTokens
from appsrc.models.achievements import Achievements
from appsrc.models.categories import Categories
from appsrc.models.courses import Courses
from appsrc.models.coursessubscribers import CoursesSubscribers
from appsrc.models.events import Events
from appsrc.models.eventssubscribers import EventsSubscribers
from appsrc.models.trainercertificates import TrainerCertificates

admin.site.register(User)
admin.site.register(Roles)
admin.site.register(UserStatuses)
admin.site.register(StatusHistory)
admin.site.register(UserRegistrationTokens)
admin.site.register(Achievements)
admin.site.register(Categories)
admin.site.register(Courses)
admin.site.register(CoursesSubscribers)
admin.site.register(Events)
admin.site.register(EventsSubscribers)
admin.site.register(TrainerCertificates)
