from django.urls import include, path
from django.conf.urls import include, url


from .views.edit_profile import EditProfile
from .views.view_profile import ViewProfile


urlpatterns = [
    path('user/profile/edit', EditProfile.as_view()),
    path('user/profile/view', ViewProfile.as_view()),
]

