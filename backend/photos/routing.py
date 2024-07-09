from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from django.urls import path
from . import consumers

application = ProtocolTypeRouter(
    {
        "http": URLRouter(
            [
                path("ws/some_path/", consumers.SomeConsumer.as_asgi()),
            ]
        ),
    }
)
