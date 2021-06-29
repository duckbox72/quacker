from django.contrib import admin
from .models import Follow, Like, Post, Profile, User
# Register your models here.
admin.site.register(User)
admin.site.register(Post)
admin.site.register(Like)
admin.site.register(Follow)
admin.site.register(Profile)