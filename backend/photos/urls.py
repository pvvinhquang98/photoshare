# urls.py

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views
from .views import (
    UserViewSet,
    ProfileViewSet,
    PhotoViewSet,
    PublicPhotoViewSet,
    PublicPhotoDetail,
    AlbumViewSet,
    TagViewSet,
    PhotoTagViewSet,
    FollowViewSet,
    ActivityViewSet,
    ActivityLogViewSet,
    UserRegistrationView,
    CurrentUserView,
    custom_admin_login,
    user_management,
    recent_activity,
    current_user,
    delete_user,
)

router = DefaultRouter()
router.register(r"users", UserViewSet)
router.register(r"profiles", ProfileViewSet)
router.register(r"photos", PhotoViewSet, basename="photo")
router.register(r"public-photos", PublicPhotoViewSet, basename="public-photo")
router.register(r"albums", AlbumViewSet)
router.register(r"tags", TagViewSet)
router.register(r"photo-tags", PhotoTagViewSet)
router.register(r"follows", FollowViewSet)
router.register(r"activities", ActivityViewSet)
router.register(r"activity-logs", ActivityLogViewSet)

urlpatterns = [
    path("", include(router.urls)),
    path("register/", UserRegistrationView.as_view(), name="register"),
    path(
        "public-photos/<int:id>/",
        PublicPhotoDetail.as_view(),
        name="public-photo-detail",
    ),
    path(
        "auth/user/", CurrentUserView.as_view(), name="current-user"
    ),  # Add new endpoint
    path("admin/login/", custom_admin_login, name="custom_admin_login"),
    path("admin/user-management/", user_management, name="user_management"),
    path("admin/recent-activity/", recent_activity, name="recent_activity"),
    path("current-user/", current_user, name="current_user"),
    path("api/admin/users/<str:username>/", delete_user, name="delete_user"),
]
