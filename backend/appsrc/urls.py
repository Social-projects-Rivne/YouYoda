from django.urls import include, path

from .views.user_registration import UserRegistration


urlpatterns = [
    path('user/register', UserRegistration.as_view(), name='register'),
]
