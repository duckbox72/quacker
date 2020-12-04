function loadProfileXX(user_id) {
    
    fetch(`profile/${user_id}`)


    feed = user_id;
    loadProfileFeed(feed)
}

function loadProfile(user_id) {

    // TOGGLE VIEW
    document.querySelector('#profile-view').style.display = 'block';
    document.querySelector('#feed-view').style.display = 'none';
    
    // DISPLAY the feed name
    document.querySelector('#profile-view-feed-name').innerHTML = 
                            `<div class="row justify-content-center mt-2">
                                <div class="col my-text text-right">
                                    my posts
                                </div>
                            </div>`;   
    
    fetch(`profile/${user_id}`)
    .then(response => response.json())
    .then(data => {
        console.log(data.username)
        document.querySelector("#profile-username").innerHTML = data.username;
        document.querySelector("#profile-following").innerHTML = data.num_following;
        document.querySelector("#profile-followers").innerHTML = data.num_followers;

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

