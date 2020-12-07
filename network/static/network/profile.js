function loadProfile(user_id) {

    // TOGGLE VIEW
    document.querySelector('#profile-view').style.display = 'block';
    document.querySelector('#feed-view').style.display = 'none';
    
    // DISPLAY the feed name
    document.querySelector('#profile-view-feed-name').innerHTML = "my posts";
    

    // DISPLAY or HIDE (in case profile is user's self) FOLLOW BUTTON                  
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

    fetch(`follow/${user_id}`) // todo ---------------------------------
    .then(response => response.json())
    .then(follow => {
        // HIDE BUTTON in case user profile is from current user
        if (follow.can_follow === true){
            document.querySelector("#toggle-follow").style.display = 'none';
        
        // SHOW BUTTON and add event listener to control toggle-folow
        } else {
            document.querySelector("#toggle-follow").addEventListener('click', function() {
                
                console.log(`FROM NOT-FOLLOWED ${user_id} TO FOLLOWED!`);
                if (document.querySelector("#toggle-follow")) {              
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

