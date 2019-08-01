from django.urls import include, path
from django.conf.urls import include, url

from .views.user_registration import UserRegistration


urlpatterns = [
    path('api/register', UserRegistration.as_view(), name='register'),
]
