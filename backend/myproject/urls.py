"""
URL configuration for myproject project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from photos import views
from oauth2_provider.urls import base_urlpatterns as oauth2_base_urlpatterns
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

router = routers.DefaultRouter()
router.register(r"photos", views.PhotoViewSet)
router.register(r"profiles", views.ProfileViewSet)
router.register(r"albums", views.AlbumViewSet)
router.register(r"comments", views.CommentViewSet)
router.register(r"notifications", views.NotificationViewSet)
router.register(r"follows", views.FollowViewSet)
router.register(r"tags", views.TagViewSet)
router.register(r"photo-tags", views.PhotoTagViewSet)
router.register(r"likes", views.LikeViewSet)
router.register(r"bookmarks", views.BookmarkViewSet)
router.register(r"activity-logs", views.ActivityLogViewSet)
router.register(r"shares", views.ShareViewSet)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include(router.urls)),
    path("api/auth/", include("rest_framework.urls", namespace="rest_framework")),
    path("o/", include("oauth2_provider.urls", namespace="oauth2_provider")),
    path("api/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("", views.home, name="home"),
]
