from django.urls import include, path
from django.conf.urls import include, url


from .views.edit_profile import EditProfile


urlpatterns = [
    path('user/edit_profile', EditProfile.as_view()),
]

