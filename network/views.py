import json
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.shortcuts import render
from django.urls import reverse
from django.views.decorators.csrf import csrf_exempt

from .models import Like, Post, User

def index(request):
    # Authenticated users view index page (home) 
    if request.user.is_authenticated:
        return render(request, "network/index.html")
    
    # Everyone else will be redirected to login
    else:
        return HttpResponseRedirect(reverse("login"))


# API route posts 
@csrf_exempt
@login_required
def add_post(request):
    # Adding a new post must be via POST
    if request.method != "POST":
        return JsonResponse({"error": "POST request required."}, status=400)

    user = request.user
    data = json.loads(request.body)
    print(user.id)
    print(user)
    print(data.get("text", ""))

  
    post = Post(
        user=user,
        text=data.get("text", "")
    )
    post.save()
    
    return JsonResponse({"message": "Posted successfully."}, status=201)



# API route edit/<post_id> 
@csrf_exempt
@login_required
def edit(request, post_id):
    # Query for requested post
    try:
        post = Post.objects.get(pk=post_id)
    except Email.DoesNotExist:
        return JsonResponse({"error": "Post not found."}, status=404)
    if request.method == "GET":
        return JsonResponse(post.serialize())


# API route feed/<feed> 
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


# API route like/<post.id>
@csrf_exempt
@login_required
def like(request, post_id):
    user = request.user

    if request.method == "GET":
    # Query for the requested like
        print(f' POST ID {post_id}, USER ID {user.username}')    
        try:
            is_liked = Like.objects.get(user=user.id, post=post_id)
        except: # LikeDoesNotExist():
            return JsonResponse({"message": f"Like not found Post {post_id}"}, status=201)

        print(is_liked)
        return JsonResponse(is_liked.serialize(), safe=False)
    
    if request.method == "POST":
        post = json.loads(request.body)
        
        like_action = post.get("action", "")
        
        if like_action == "delete":
            liked_post = post.get("post", "")
            delete_like = Like.objects.get(user=user.id, post=liked_post)
            delete_like.delete()
            print(f"===>>> {like_action}, {liked_post} ===>deleted")
            # Print post to terminal and return it to be logged on console
            #print(f"=====>>>> DELETED LIKE >>>> {delete_like}")
            return JsonResponse(post)
        else: # like_action == create
            liked_post = post.get("post", "")
            like = Like(
                user=user,
                post=Post.objects.get(pk=post_id)
            )
            like.save()
            return JsonResponse(like.serialize(), safe=False)
    


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
