from django.db import models
from django.contrib.auth.models import AbstractUser
#from django.utils import timezone

class User(AbstractUser):
    pass


class Follow(models.Model):
    follower = models.ForeignKey("User", on_delete=models.CASCADE, related_name="following")
    followed = models.ForeignKey("User", on_delete=models.CASCADE, related_name="follows")

    def serialize(self):
        return {
            "id": self.id,
            "follower": self.follower,
            "followed": self.followed,
        }

class Like(models.Model):
    user = models.ForeignKey("User", on_delete=models.CASCADE, related_name="user_liked")
    post = models.ForeignKey("Post", on_delete=models.CASCADE, related_name="post_likes")
    
    def serialize(self):
        return {
            "id": self.id,
            "user": self.user.id,
            "post": self.post.id,
        }

class Post(models.Model):
    user = models.ForeignKey("User", on_delete=models.CASCADE, related_name="poster")
    text = models.CharField(max_length=256)
    created = models.DateTimeField(auto_now_add=True)
    edited = models.IntegerField(default=0)
    #created = models.DateTimeField(default=timezone.now)

    #def __str__(self):
    #    return f"ID: {self.id} | USER_ID: {self.poster} | TEXT: {self.text} | CREATED: {self.created}"
    
    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user.id,
            "username": self.user.username,
            "user_email": self.user.email,
            "text": self.text,
            "created": self.created.strftime("%b %-d %Y, %-I:%M %p"),
            "edited": self.edited,
        }
    