function loadProfile(user_id) {

    // TOGGLE VIEW
    document.querySelector('#profile-view').style.display = 'block';
    document.querySelector('#feed-view').style.display = 'none';
    
    // DISPLAY the feed name
    document.querySelector('#profile-view-feed-name').innerHTML = "my posts";
                               
                        
    
    fetch(`profile/${user_id}`)
    .then(response => response.json())
    .then(profile => {
        
        document.querySelector("#profile-username").innerHTML = profile.username;
        document.querySelector("#profile-description").innerHTML = profile.description;
        document.querySelector("#profile-following").innerHTML = profile.num_following;
        document.querySelector("#profile-followers").innerHTML = profile.num_followers;

        if (profile.photo_name !== "") {
            (document.querySelector("#profile-photo").src = `${profile.photo_name}`) 
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

