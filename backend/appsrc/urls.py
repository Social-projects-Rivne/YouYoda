from django.urls import include, path
from django.conf.urls import include, url

from .views.change_password import ChangePassword
from .views.edit_profile import EditProfile
from .views.view_profile import ViewProfile
from .views.user_login_logout import UserLogin, UserLogout
from .views.user_registration import UserRegistration
from .views.user_to_trainer import UserToTrainer
from .views.courses import TopCourses, SearchingCourses
from .views.events import TopEvents


urlpatterns = [
    path('user/profile/edit', EditProfile.as_view(), name='edit_profile'),
    path('user/profile/change_password', ChangePassword.as_view(), name='change_password'),
    path('user/profile/view', ViewProfile.as_view(), name='view_profile'),
    path('user/register', UserRegistration.as_view(), name='register'),
    path('user/login', UserLogin.as_view(), name='login'),
    path('user/logout', UserLogout.as_view(), name='logout'),
    path('user/totrainer', UserToTrainer.as_view(), name='change_role'),
    path('courses/top', TopCourses.as_view(), name='top-courses'),
    path('courses/search', SearchingCourses.as_view(), name='search-courses'),
    # path('events/search', SearchingEvents.as_view(), name='search-events'),
    path('events/top', TopEvents.as_view(), name='top-events'),
]
