from django.contrib.auth.models import User
from django.db import models


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.TextField(blank=True)
    website = models.URLField(blank=True)
    location = models.CharField(max_length=255, blank=True)
    birthdate = models.DateField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.user.username


class Photo(models.Model):
    VISIBILITY_CHOICES = [("public", "Public"), ("private", "Private")]

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    album = models.ForeignKey("Album", on_delete=models.SET_NULL, null=True, blank=True)
    image = models.ImageField(upload_to="images/", default="images/default.jpg")
    caption = models.TextField(blank=True)
    visibility = models.CharField(
        max_length=7, choices=VISIBILITY_CHOICES, default="public"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Photo {self.id} by {self.user.username}"


class Album(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title


class Tag(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name


class PhotoTag(models.Model):
    photo = models.ForeignKey(Photo, on_delete=models.CASCADE)
    tag = models.ForeignKey(Tag, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.photo.id} - {self.tag.name}"


class Follow(models.Model):
    follower = models.ForeignKey(
        User, related_name="following", on_delete=models.CASCADE
    )
    followee = models.ForeignKey(
        User, related_name="followers", on_delete=models.CASCADE
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.follower.username} follows {self.followee.username}"


class Activity(models.Model):
    ACTIVITY_CHOICES = [("like", "Like"), ("share", "Share"), ("comment", "Comment")]

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    photo = models.ForeignKey(Photo, on_delete=models.CASCADE)
    type = models.CharField(max_length=10, choices=ACTIVITY_CHOICES)
    content = models.TextField(null=True, blank=True)
    platform = models.CharField(max_length=50, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} {self.type} on {self.photo.id}"


class ActivityLog(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    activity = models.ForeignKey(Activity, on_delete=models.CASCADE)
    log_message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Log by {self.user.username} on {self.created_at}"


class Event(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    location = models.CharField(max_length=255)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    organizer = models.ForeignKey(
        User, related_name="organized_events", on_delete=models.CASCADE
    )
    attendees = models.ManyToManyField(
        User, related_name="attended_events", through="EventAttendee"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title


class EventAttendee(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    joined_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} is attending {self.event.title}"


class Notification(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Notification for {self.user.username}"


class Permission(models.Model):
    name = models.CharField(max_length=50, unique=True)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name


class UserPermission(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    permission = models.ForeignKey(Permission, on_delete=models.CASCADE)
    granted_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.permission.name}"
