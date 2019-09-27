from django.urls import include, path

from .views.categories import CategoriesList
from .views.change_avatar import FileUploadView
from .views.change_password import ChangePassword
from .views.check_user import CheckUser
from .views.courses import CourseScheduleView, TopCourses, SearchingCourses
from .views.comment import CourseComments, EventComments
from .views.edit_profile import EditProfile
from .views.events import TopEvents, SearchingEvents
from .views.trainer import TrainerPage
from .views.user_login_logout import UserLogin, UserLogout, UserSocialLogin
from .views.user_registration import UserRegistration, UserSocialRegistration
from .views.user_to_trainer import UserToTrainer, UserSendRequest, UserGetRequest
from .views.users_administration import UsersGetList
from .views.user_subscribe_to_event import UserSubscribeToEvent
from .views.user_subscribe_to_course import UserSubscribeToCourse
from .views.pdp import PDP
from .views.view_profile import ViewProfile, ViewCoursesProfile, ViewEventsProfile, ViewAchievementsProfile


urlpatterns = [
    path('categories/list', CategoriesList.as_view(), name='categories-list'),
    path('courses/comments', CourseComments.as_view(), name='comments-courses'),
    path('courses/schedule', CourseScheduleView.as_view(), name='courses-schedule'),
    path('courses/search', SearchingCourses.as_view(), name='search-courses'),
    path('courses/top', TopCourses.as_view(), name='top-courses'),
    path('events/search', SearchingEvents.as_view(), name='search-events'),
    path('events/comments', EventComments.as_view(), name='comments-events'),
    path('courses/schedule', CourseScheduleView.as_view(), name='courses-schedule'),
    path('events/top', TopEvents.as_view(), name='top-events'),
    path('trainer/page', TrainerPage.as_view(), name='top-events'),
    path('user/totrainer/getrequest', UserGetRequest.as_view()),
    path('user/totrainer/sendrequest', UserSendRequest.as_view(), name='sendrequest'),
    path('user/social/register', UserSocialRegistration.as_view(), name='social_register'),
    path('user/totrainer', UserToTrainer.as_view(), name='change_role'),
    path('user/course/add', UserSubscribeToCourse.as_view(), name='subscribe_course'),
    path('user/event/add', UserSubscribeToEvent.as_view(), name='subscribe_event'),
    path('user/pdp', PDP.as_view(), name='pdp'),
    path('users/getlist', UsersGetList.as_view()),   
]
