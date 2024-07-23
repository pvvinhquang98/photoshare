# views.py

from rest_framework import viewsets, generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import (
    AllowAny,
    IsAuthenticated,
    IsAuthenticatedOrReadOnly,
)
from django.contrib.auth.models import User
from django.shortcuts import render
from django.db.models import Q
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

    def get_object(self):
        try:
            return Profile.objects.get(user_id=self.kwargs["pk"])
        except Profile.DoesNotExist:
            raise Http404("Profile does not exist")


class PhotoViewSet(viewsets.ModelViewSet):
    queryset = Photo.objects.all()
    serializer_class = PhotoSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        search_query = self.request.query_params.get("search", None)

        if search_query:
            return Photo.objects.filter(
                Q(caption__icontains=search_query)
                | Q(tags__name__icontains=search_query),
                Q(visibility="public") | Q(user=user),
            ).distinct()

        return Photo.objects.filter(Q(visibility="public") | Q(user=user)).distinct()

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class PublicPhotoViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Photo.objects.filter(visibility="public")
    serializer_class = PhotoSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        queryset = super().get_queryset()
        search_query = self.request.query_params.get("search", None)
        if search_query:
            queryset = queryset.filter(
                Q(caption__icontains=search_query)
                | Q(tags__name__icontains=search_query)
            ).distinct()
        return queryset


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


class CurrentUserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)
