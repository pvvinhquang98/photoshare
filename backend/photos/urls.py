from django.urls import path, include
from rest_framework.routers import DefaultRouter
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
    EventViewSet,
    EventAttendeeViewSet,
    NotificationViewSet,
    PermissionViewSet,
    UserPermissionViewSet,
    UserRegistrationView,
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
router.register(r"permissions", PermissionViewSet)
router.register(r"user-permissions", UserPermissionViewSet)
router.register(r"events", EventViewSet)
router.register(r"event-attendees", EventAttendeeViewSet)
router.register(r"notifications", NotificationViewSet)

urlpatterns = [
    path("", include(router.urls)),
    path("register/", UserRegistrationView.as_view(), name="register"),
    path(
        "public-photos/<int:id>/",
        PublicPhotoDetail.as_view(),
        name="public-photo-detail",
    ),
]
