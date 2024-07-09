from django.contrib import admin
from .models import User, Profile, Photo, Album, Tag, PhotoTag, Follow, Activity

admin.site.register(User)
admin.site.register(Profile)
admin.site.register(Photo)
admin.site.register(Album)
admin.site.register(Tag)
admin.site.register(PhotoTag)
admin.site.register(Follow)
admin.site.register(Activity)
