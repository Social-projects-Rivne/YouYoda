from django.urls import include, path
from django.conf.urls import include, url

from .views.check_user import CheckUser
from .views.edit_profile import EditProfile
from .views.view_profile import ViewProfile
from .views.user_login_logout import UserLogin, UserLogout
from .views.user_registration import UserRegistration
from .views.user_to_trainer import UserToTrainer, UserSendRequest, UserGetRequest
from .views.users_administration import UsersGetList


urlpatterns = [
    path('user/check', CheckUser.as_view(), name='check'),
    path('user/profile/edit', EditProfile.as_view()),
    path('user/profile/view', ViewProfile.as_view()),
    path('user/register', UserRegistration.as_view(), name='register'),
    path('user/login', UserLogin.as_view(), name='login'),
    path('user/logout', UserLogout.as_view(), name='logout'),
    path('user/totrainer', UserToTrainer.as_view(), name='change_role'),
    path('user/totrainer/sendrequest', UserSendRequest.as_view(), name='sendrequest'),
    path('user/totrainer/getrequest', UserGetRequest.as_view()),
    path('users/getlist', UsersGetList.as_view()),
]
