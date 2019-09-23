from django.urls import path

from .views.categories import CategoriesList
from .views.change_password import ChangePassword
from .views.check_user import CheckUser
from .views.comment import CourseComments
from .views.edit_profile import EditProfile
from .views.change_avatar import FileUploadView
from .views.orginize_event import OrganizeEvent
from .views.events import SearchingEvents, TopEvents
from .views.courses import SearchingCourses, TopCourses
from .views.users_administration import UsersGetList
from .views.user_to_trainer import UserGetRequest, UserToTrainer, UserSendRequest
from .views.user_login_logout import UserLogin, UserLogout, UserSocialLogin
from .views.user_registration import UserRegistration, UserSocialRegistration
from .views.view_profile import ViewProfile


urlpatterns = [
    path('categories/list', CategoriesList.as_view(), name='categories-list'),
    path('courses/comments', CourseComments.as_view(), name='comments-courses'),
    path('courses/search', SearchingCourses.as_view(), name='search-courses'),
    path('courses/top', TopCourses.as_view(), name='top-courses'),
    path('events/search', SearchingEvents.as_view(), name='search-events'),
    path('events/top', TopEvents.as_view(), name='top-events'),
    path('user/totrainer/getrequest', UserGetRequest.as_view()),
    path('user/totrainer/sendrequest', UserSendRequest.as_view(), name='sendrequest'),
    path('user/check', CheckUser.as_view(), name='check'),
    path('user/login', UserLogin.as_view(), name='login'),
    path('user/logout', UserLogout.as_view(), name='logout'),
    path('user/profile/change_avatar', FileUploadView.as_view(), name='change_avatar'),
    path('user/profile/change_password', ChangePassword.as_view(), name='change_password'),
    path('user/profile/edit', EditProfile.as_view()),
    path('user/profile/view', ViewProfile.as_view(), name='view_profile'),
    path('user/profile/event_organize', OrganizeEvent.as_view(), name='organize_event'),
    path('user/register', UserRegistration.as_view(), name='register'),
    path('user/social/login', UserSocialLogin.as_view(), name='social_login'),
    path('user/social/register', UserSocialRegistration.as_view(), name='social_register'),
    path('user/totrainer', UserToTrainer.as_view(), name='change_role'),
    path('users/getlist', UsersGetList.as_view()),
]
