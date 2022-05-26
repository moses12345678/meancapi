from django.urls import path
from django.conf.urls import include
from rest_framework import routers
from .views import PostView, PhotoView, ProfileView, UserView

router = routers.DefaultRouter()
router.register('users', UserView)
router.register('posts', PostView)
router.register('photo', PhotoView)
router.register('profile', ProfileView)


urlpatterns = [
    path('', include(router.urls)),
]
