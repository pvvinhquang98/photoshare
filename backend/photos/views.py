from rest_framework import viewsets
from django.http import HttpResponse
from .models import (
    Profile,
    Photo,
    Album,
    Comment,
    Notification,
    Follow,
    Tag,
    PhotoTag,
    Like,
    Bookmark,
    ActivityLog,
    Share,
)
from .serializers import (
    ProfileSerializer,
    PhotoSerializer,
    AlbumSerializer,
    CommentSerializer,
    NotificationSerializer,
    FollowSerializer,
    TagSerializer,
    PhotoTagSerializer,
    LikeSerializer,
    BookmarkSerializer,
    ActivityLogSerializer,
    ShareSerializer,
)


class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer


class PhotoViewSet(viewsets.ModelViewSet):
    queryset = Photo.objects.all()
    serializer_class = PhotoSerializer


class AlbumViewSet(viewsets.ModelViewSet):
    queryset = Album.objects.all()
    serializer_class = AlbumSerializer


class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer


class NotificationViewSet(viewsets.ModelViewSet):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer


class FollowViewSet(viewsets.ModelViewSet):
    queryset = Follow.objects.all()
    serializer_class = FollowSerializer


class TagViewSet(viewsets.ModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer


class PhotoTagViewSet(viewsets.ModelViewSet):
    queryset = PhotoTag.objects.all()
    serializer_class = PhotoTagSerializer


class LikeViewSet(viewsets.ModelViewSet):
    queryset = Like.objects.all()
    serializer_class = LikeSerializer


class BookmarkViewSet(viewsets.ModelViewSet):
    queryset = Bookmark.objects.all()
    serializer_class = BookmarkSerializer


class ActivityLogViewSet(viewsets.ModelViewSet):
    queryset = ActivityLog.objects.all()
    serializer_class = ActivityLogSerializer


class ShareViewSet(viewsets.ModelViewSet):
    queryset = Share.objects.all()
    serializer_class = ShareSerializer


def home(request):
    return HttpResponse("Welcome to PixShare!")
