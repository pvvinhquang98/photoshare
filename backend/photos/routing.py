from django.urls import path
from . import consumers

websocket_urlpatterns = [
    path("ws/photos/", consumers.PhotoConsumer.as_asgi()),
]
