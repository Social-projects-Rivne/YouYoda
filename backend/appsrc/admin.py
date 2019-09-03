from django.contrib import admin

# Register your models here.
from appsrc.models import YouYodaUser as User
from appsrc.models import Roles


admin.site.register(User)
admin.site.register(Roles)