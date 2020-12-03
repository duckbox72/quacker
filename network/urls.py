
from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),

    # API Routes
    path("edit/<int:post_id>", views.edit, name="edit"),
    path("erase/<int:post_id>", views.erase, name="erase"),
    path("feed/<str:feed>", views.feed, name="feed"),
    path("like/<int:post_id>", views.like, name="like"),
    path("num_likes/<int:post_id>", views.num_likes, name="num_likes"),
    path("posts", views.add_post, name="add_post"),
    
]
