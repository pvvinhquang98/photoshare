from rest_framework import viewsets, generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.contrib.auth.models import User
from .models import (
    Profile,
    Photo,
    Album,
    Tag,
    PhotoTag,
    Follow,
    Activity,
    ActivityLog,
    Event,
    EventAttendee,
    Notification,
    Permission,
    UserPermission,
)
from .serializers import (
    UserSerializer,
    ProfileSerializer,
    PhotoSerializer,
    AlbumSerializer,
    TagSerializer,
    PhotoTagSerializer,
    FollowSerializer,
    ActivitySerializer,
    ActivityLogSerializer,
    EventSerializer,
    EventAttendeeSerializer,
    NotificationSerializer,
    PermissionSerializer,
    UserPermissionSerializer,
    UserRegistrationSerializer,
)


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer


class PhotoViewSet(viewsets.ModelViewSet):
    queryset = Photo.objects.all()
    serializer_class = PhotoSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class PublicPhotoViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Photo.objects.filter(visibility="public")
    serializer_class = PhotoSerializer
    permission_classes = [AllowAny]


class PublicPhotoDetail(generics.RetrieveAPIView):
    queryset = Photo.objects.filter(visibility="public")
    serializer_class = PhotoSerializer
    permission_classes = [AllowAny]
    lookup_field = "id"


class AlbumViewSet(viewsets.ModelViewSet):
    queryset = Album.objects.all()
    serializer_class = AlbumSerializer


class TagViewSet(viewsets.ModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer


class PhotoTagViewSet(viewsets.ModelViewSet):
    queryset = PhotoTag.objects.all()
    serializer_class = PhotoTagSerializer


class FollowViewSet(viewsets.ModelViewSet):
    queryset = Follow.objects.all()
    serializer_class = FollowSerializer


class ActivityViewSet(viewsets.ModelViewSet):
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer


class ActivityLogViewSet(viewsets.ModelViewSet):
    queryset = ActivityLog.objects.all()
    serializer_class = ActivityLogSerializer


class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer


class EventAttendeeViewSet(viewsets.ModelViewSet):
    queryset = EventAttendee.objects.all()
    serializer_class = EventAttendeeSerializer


class NotificationViewSet(viewsets.ModelViewSet):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer


class PermissionViewSet(viewsets.ModelViewSet):
    queryset = Permission.objects.all()
    serializer_class = PermissionSerializer


class UserPermissionViewSet(viewsets.ModelViewSet):
    queryset = UserPermission.objects.all()
    serializer_class = UserPermissionSerializer


class UserRegistrationView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
