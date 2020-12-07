function loadProfile(user_id) {

    // TOGGLE VIEW
    document.querySelector('#profile-view').style.display = 'block';
    document.querySelector('#feed-view').style.display = 'none';
    
    // DISPLAY the feed name
    document.querySelector('#profile-view-feed-name').innerHTML = "my posts";
    
    // FETCH FOR PROFILE DATA
    fetch(`profile/${user_id}`)
    .then(response => response.json())
    .then(profile => {
 
        document.querySelector("#profile-username").innerHTML = profile.username;
        document.querySelector("#profile-following").innerHTML = profile.num_following;
        document.querySelector("#profile-followers").innerHTML = profile.num_followers;
        
        if (profile.photo_name !== "") {
            document.querySelector("#profile-photo").src = `${profile.photo_name}`
        }
        else {
            document.querySelector("#profile-photo").src = `/static/network/no-user.png`
        }
    });
    
    // FETCH FOR FOLLOW STATUSES AND RENDER BUTTON ACCORDINGLY
    fetch(`follow/${user_id}`)
    .then(response => response.json())
    .then(follow => {
        // OPTIONS
        // follow.can_follow , follow.is_followed //
        
        // CREATE a BUTTON to TOGGLE-FOLLOW
        const element = document.createElement('button');
        element.id = `toggle-follow-button${user_id}`

        if (follow.is_followed === false) {
            element.innerHTML = "Follow";
            element.className = `btn btn-sm my-btn rounded-pill shadow-sm m-2 pl-3 pr-3`;
        } else {
            element.innerHTML = "Unfollow";
            element.className = `btn btn-sm my-btn rounded-pill shadow-sm m-2`;
        }
        
        // HIDE or RENDER BUTTON accordingly
        if (follow.can_follow === false) {
            document.querySelector("#toggle-follow").innerHTML = ''; 
        } else {
            document.querySelector("#toggle-follow").innerHTML = '';
            document.querySelector("#toggle-follow").append(element);   
        }  
        
        // TOGGLE FOLLOW 
        if (document.querySelector("#toggle-follow").innerHTML !== '') {
            document.querySelector(`#toggle-follow-button${user_id}`).addEventListener('click', function() {
                        
                console.log(`FROM NOT-FOLLOWED ${user_id} TO FOLLOWED!`);
                if (document.querySelector("#toggle-follow") !== '') {              
                    fetch(`follow/${user_id}`, {
                        method: 'POST',
                        body: JSON.stringify({
                            user_id: user_id,
                            action: "follow",
                        })
                    }) 
                    
                    .then(response => response.json())
                    .then(post => {
                        console.log(post)
                    })

                }


            });
        }
    });
    
    



    // fetch for user FEED and generate POST for each entry                           
    feed = user_id;
    fetch(`feed/${feed}`) // STRING TYPE
    .then(response => response.json())
    .then(posts => {
        console.log(posts)
        // Display custom message case FEED has NO POSTS
        if (posts.length == 0) {
            document.querySelector("#feed-view"). innerHTML +=
            `<div class="row my-text mt-3 justify-content-center"
                <div class="col-6  text-center">
                    This feed has no posts yet.
                </div>
            </div>`;
        };

        // CLEAR out old FEED before render new FEED
        document.querySelector("#feed-view-following").innerHTML = "";
        document.querySelector("#feed-view-all").innerHTML = "";
        document.querySelector("#profile-view-feed").innerHTML = "";

        posts.forEach(post => {
            generatePost(post, feed)
        });

    });
}

