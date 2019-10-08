from django.urls import include, path

from .views.categories import CategoriesList
from .views.change_password import ChangePassword
from .views.check_user import CheckUser
from .views.comment import CourseComments, EventComments, TrainerComment
from .views.courses import CourseScheduleView, SearchingCourses, TopCourses
from .views.edit_profile import EditProfile
from .views.change_avatar import FileUploadView
from .views.last_seen import LastSeen
from .views.pdp import PDP
from .views.events import SearchingEvents, TopEvents 
from .views.trainer import TopTrainers, TrainerPage 
from .views.user_login_logout import UserLogin, UserLogout, UserSocialLogin
from .views.user_registration import UserRegistration, UserSocialRegistration
from .views.user_to_trainer import UserGetRequest, UserSendRequest, UserToTrainer
from .views.users_administration import UsersGetList, GetUsersStatuses, UpdateUsersStatuses
from .views.user_subscribe_to_course import CheckSubscribeToCourse, UserSubscribeToCourse
from .views.user_subscribe_to_event import CheckSubscribeEvent, UserSubscribeToEvent
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
    path('events/top', TopEvents.as_view(), name='top-events'),
    path('last/seen', LastSeen.as_view(), name='last_seen'),
    path('trainer/comments', TrainerComment.as_view(), name='trainer-comment'),
    path('trainer/page', TrainerPage.as_view(), name='trainer-page'),
    path('trainer/top', TopTrainers.as_view(), name='top-trainers'),
    path('user/check', CheckUser.as_view(), name='check'),
    path('user/login', UserLogin.as_view(), name='login'),
    path('user/logout', UserLogout.as_view(), name='logout'),
    path('user/profile/courses', ViewCoursesProfile.as_view(), name='user_courses'),
    path('user/profile/events', ViewEventsProfile.as_view(), name='user_events'),
    path('user/profile/achievements', ViewAchievementsProfile.as_view(), name='user_achievements'),
    path('user/profile/change_avatar', FileUploadView.as_view(), name='change_avatar'),
    path('user/profile/change_password', ChangePassword.as_view(), name='change_password'),
    path('user/profile/edit', EditProfile.as_view()),
    path('user/profile/view', ViewProfile.as_view(), name='view_profile'),
    path('user/register', UserRegistration.as_view(), name='register'),
    path('user/social/login', UserSocialLogin.as_view(), name='social_login'),
    path('user/social/register', UserSocialRegistration.as_view(), name='social_register'),
    path('user/totrainer', UserToTrainer.as_view(), name='change_role'),
    path('user/totrainer/getrequest', UserGetRequest.as_view()),
    path('user/totrainer/sendrequest', UserSendRequest.as_view(), name='sendrequest'),
    path('user/course/add', UserSubscribeToCourse.as_view(), name='subscribe_course'),
    path('user/course/checksubscribe', CheckSubscribeToCourse.as_view(), name='check-subscribe-course'),
    path('user/course/delete', UserSubscribeToCourse.as_view(), name='unsubscribe-course'),
    path('user/course/managefavorite', UserSubscribeToCourse.as_view(), name='add-favorite-course'),
    path('user/event/add', UserSubscribeToEvent.as_view(), name='subscribe_event'),
    path('user/event/checksubscribe', CheckSubscribeEvent.as_view(), name='check-subscribe-event'),
    path('user/event/delete', UserSubscribeToEvent.as_view(), name='unsubscribe-event'),
    path('user/pdp', PDP.as_view(), name='pdp'),
    path('users/getlist', UsersGetList.as_view()),
    path('users/getstatuses', GetUsersStatuses.as_view()),
    path('users/updatestatuses', UpdateUsersStatuses.as_view())
]
