from django.urls import include, path
from django.conf.urls import include, url

from .views.user_registration import UserRegistration


urlpatterns = [
    path('/api/user/profile/edit', UserRegistration.as_view(), name='register'),
]