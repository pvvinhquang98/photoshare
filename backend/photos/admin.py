# admin.py

from django.contrib import admin
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

# Đăng ký các model của bạn ở đây
admin.site.register(Profile)
admin.site.register(Photo)
admin.site.register(Album)
admin.site.register(Tag)
admin.site.register(PhotoTag)
admin.site.register(Follow)
admin.site.register(Activity)
admin.site.register(ActivityLog)
admin.site.register(Event)
admin.site.register(EventAttendee)
admin.site.register(Notification)
admin.site.register(Permission)
admin.site.register(UserPermission)
