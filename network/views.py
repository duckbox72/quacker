import datetime
import json
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.core.paginator import Paginator
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.shortcuts import render
from django.urls import reverse
from django.views.decorators.csrf import csrf_exempt

from .models import Follow, Like, Post, Profile, User

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

    post = Post(
        user=user,
        text=data.get("text", "")
    )
    post.save()
    
    return JsonResponse({"message": "Posted successfully."}, status=201)


# API route delete/<post_id> 
@csrf_exempt
@login_required
def erase(request, post_id):
    # Editing or erasing a post must be via POST request
    if request.method != "POST":
        return JsonResponse({"error": "POST request required."}, status=400)
    
    post = Post.objects.get(pk=post_id)
    data = json.loads(request.body)
    
    post.delete()

    return JsonResponse({"sucess": "post deleted."}, safe=False, status=200)


# API route edit/<post_id> 
@csrf_exempt
@login_required
def edit(request, post_id):
    # Editing or erasing a post must be via POST request
    if request.method != "POST":
        return JsonResponse({"error": "POST request required."}, status=400)
    
    post = Post.objects.get(pk=post_id)
    data = json.loads(request.body)
    
    post.text = data["text"]
    post.edited = post.edited + 1

    post.save()

    # print(f"POST SENT {post}")
    return JsonResponse(post.serialize(), safe=False, status=200) 

# API route feed/<feed> 
@login_required
def feed(request, feed):
    user = request.user

    # SELECT FEED (feed) POSTS 
    if feed == "all":
        posts = Post.objects.all().order_by("-created")  
        complete_posts = [post.serialize() for post in posts]
    
    elif feed == "following":
        # OBTAIN list of FOLLOWED users
        following = Follow.objects.filter(follower=user)  
        
        complete_posts = [] 
        for follow in following:
            posts = Post.objects.filter(user=follow.followed).order_by('-created')
            user_posts = [post.serialize() for post in posts]

            for post in user_posts:
                complete_posts.append(post)

        complete_posts = sorted(complete_posts, key = lambda i: i['created'], reverse=True)

    elif feed.isnumeric() == True:
        feed_user= User.objects.get(pk=int(feed))
        posts = Post.objects.filter(user=feed_user).order_by('-created')
        complete_posts = [post.serialize() for post in posts]

    else:
        return JsonResponse({"error": "Invalid feed."}, safe=False, status=400)
    
    # Check if each post is liked or not by active user 
    for post in complete_posts:      
        try:
            is_liked = Like.objects.get(user=user.id, post=post["id"])
            post["is_liked"] = True
        except: # LikeDoesNotExist():
            post["is_liked"] = False
        
    # Check num_likes for each post
    for post in complete_posts:      
        num_likes = Like.objects.filter(post=post["id"])
        post["num_likes"] = len(num_likes)
    
    # Check can_edit for each post
    for post in complete_posts: 
        try:
            can_edit = Post.objects.get(id=post["id"], user=user)
            post["can_edit"] = True
        except: # CANNOT_EDIT
            post["can_edit"] = False 

    # Check profile photo_name
    for post in complete_posts:
        try: 
            profile = Profile.objects.get(pk=post["user_id"])
            photo_name = profile.photo.name
            post["photo_name"] = photo_name

        except:
            photo_name = "/static/network/no-user.png"
            post["photo_name"] = photo_name
            
    # Create Pagination ==========================================================================
    p = Paginator(complete_posts, 10)
    
    feed_pages = []
    for i in p.page_range:
        page = p.page(i)
        number = i
        posts = page.object_list
        has_previous = page.has_previous()
        has_next = page.has_next()
        
        complete_page = {"number": number, "posts": posts, "has_previous": has_previous, "has_next": has_next}
        feed_pages.append(complete_page)      
    
    # Return feed of pages and posts   ###********* FEED REQUEST RERURN *********###
    return JsonResponse([page for page in feed_pages], safe=False)
    

# API route follow/<user_id>
@csrf_exempt
@login_required
def follow(request, user_id):
    user = request.user
    # ROUTE reached by a POST request
    if request.method == "POST":

        follow_request = json.loads(request.body)
        action = follow_request.get("action")
        
        followed = User.objects.get(id=follow_request.get("user_id"))
        follower = user
        
        if action == "follow":       
            follow = Follow(follower=follower, followed=followed)
            follow.save() 
            
            return JsonResponse(follow.serialize(), safe=False)
          
        else:
            follow = Follow.objects.get(follower=follower, followed=followed)
            deleted_follow = follow
            follow.delete()
            
            return JsonResponse(deleted_follow.serialize(), safe=False)

    # ROUTE reached by a GET request
    else:
        # VERIFY can_follow status
        if user.id == user_id:
            can_follow = False
        else:
            can_follow = True

            # VERIFY if (query user) is_followed (by current user) status 
        try:
            is_followed = Follow.objects.get(follower=user, followed=User.objects.get(id=user_id))
            is_followed = True
        except: # FollowDoesNotExist():
            is_followed = False 

        return JsonResponse({"can_follow": can_follow, "is_followed": is_followed})



# API route like/<post.id>
@csrf_exempt
@login_required
def like(request, post_id):
    user = request.user

    if request.method == "GET":
    # Query for the requested like
        # print(f' POST ID {post_id}, USER ID {user.username}')    
        try:
            is_liked = Like.objects.get(user=user.id, post=post_id)
        except: # LikeDoesNotExist():
            return JsonResponse({"message": f"Like not found Post {post_id}"}, status=201)

        return JsonResponse(is_liked.serialize(), safe=False)
    
    if request.method == "POST":
        post = json.loads(request.body)
        
        like_action = post.get("action", "")
        
        if like_action == "delete":
            liked_post = post.get("post", "")
            delete_like = Like.objects.get(user=user.id, post=liked_post)
            delete_like.delete()
            
            return JsonResponse(post)
        else: # like_action == create
            liked_post = post.get("post", "")
            like = Like(
                user=user,
                post=Post.objects.get(pk=post_id)
            )
            like.save()
            return JsonResponse(like.serialize(), safe=False)
    

@login_required
def num_likes(request, post_id):
     
    num_likes = Like.objects.filter(post=post_id).count()
    
    # print(f"NUMBER OF LIKES {num_likes} ---------")
    
    return JsonResponse({"likes": num_likes})



@login_required
def profile(request, user_id):
    user = request.user
    
    try:
        profile = Profile.objects.get(pk=user_id)
        description = profile.description
        photo_name = profile.photo.name
    
    except:
        description = ""
        photo_name = ""
        pass
    
    
    if user_id == user.id:
        can_follow = False
    else:
        can_follow = True
        
    
    username = User.objects.get(pk=user_id).username
    num_followers = len(Follow.objects.filter(followed=user_id))
    num_following = len(Follow.objects.filter(follower=user_id))

    complete_profile = {"username": username, 
                        "num_followers": num_followers, 
                        "num_following": num_following, 
                        "can_follow": can_follow,
                        "description": description,
                        "photo_name": photo_name,
                        }

    return JsonResponse(complete_profile)




# REGISTER LOGIN LOGOUT ---------------- ROUTES --------------------
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
