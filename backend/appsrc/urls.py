from .views.user_login_logout import UserLogin, UserLogout
from .views.user_registration import UserRegistration

from django.urls import include, path


urlpatterns = [
    path('user/register', UserRegistration.as_view(), name='register'),
    path('user/login', UserLogin.as_view(), name='login'),
    path('user/logout', UserLogout.as_view(), name='logout'),
]
