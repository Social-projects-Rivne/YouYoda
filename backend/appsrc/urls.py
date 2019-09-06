from django.urls import include, path

from .views.change_password import ChangePassword
from .views.check_user import CheckUser
from .views.edit_profile import EditProfile
from .views.change_avatar import FileUploadView
from .views.orginize_event import OrganizeEvent
from .views.courses import TopCourses
from .views.events import TopEvents
from .views.user_login_logout import UserLogin, UserLogout, UserSocialLogin
from .views.user_registration import UserRegistration, UserSocialRegistration
from .views.user_to_trainer import UserToTrainer
from .views.users_administration import UsersGetList
from .views.view_profile import ViewProfile


urlpatterns = [
    path('user/check', CheckUser.as_view(), name='check'),
    path('user/profile/edit', EditProfile.as_view()),
    path('user/profile/change_password', ChangePassword.as_view(), name='change_password'),
    path('user/profile/change_avatar', FileUploadView.as_view(), name='change_avatar'),
    path('user/profile/view', ViewProfile.as_view(), name='view_profile'),
    path('user/profile/event_organize', OrganizeEvent.as_view(), name='organize_event'),
    path('user/register', UserRegistration.as_view(), name='register'),
    path('user/login', UserLogin.as_view(), name='login'),
    path('user/logout', UserLogout.as_view(), name='logout'),
    path('user/totrainer', UserToTrainer.as_view(), name='change_role'),
    path('courses/top', TopCourses.as_view(), name='top-courses'),
    path('events/top', TopEvents.as_view(), name='top-events'),
    path('users/getlist', UsersGetList.as_view()),
    path('user/social/register', UserSocialRegistration.as_view(), name='social_register'),
    path('user/social/login', UserSocialLogin.as_view(), name='social_login')
]
