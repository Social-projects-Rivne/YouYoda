from django.urls import path, include

from .views.user_to_trainer import UserToTrainer

urlpatterns = [
    path('api/usertotrainer', UserToTrainer.as_view()),
]
