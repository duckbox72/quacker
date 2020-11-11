from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.shortcuts import render
from django.urls import reverse

from .models import Post, User

def index(request):
    # Authenticated users view index page (home) 
    if request.user.is_authenticated:
        #posts = Post.objects.all().order_by('-created')
        return render(request, "network/index.html")
    
    # Everyone else will be redirected to login
    else:
        return HttpResponseRedirect(reverse("login"))

# feed/<feed> 
@login_required
def feed(request, feed):
    # Filter posts returned on feed
    if feed == "all posts":
        posts = Post.objects.all().order_by("-created")
    elif feed == "following":
        posts = Post.objects.all().order_by("-created")
    else:
        return JsonResponse({"error": "Invalid feed."}, status=400)
    
    # Return feed of posts in reverse chronologial order    
    return JsonResponse([post.serialize() for post in posts], safe=False)


def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "network/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "network/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "network/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "network/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "network/register.html")
