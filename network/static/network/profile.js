function loadProfile(user_id) {

    // TOGGLE VIEW
    document.querySelector('#profile-view').style.display = 'block';
    document.querySelector('#feed-view').style.display = 'none';
    
    // DISPLAY the feed name
    //document.querySelector('#profile-view-feed-name').innerHTML = "my posts";
    
    // FETCH FOR PROFILE DATA
    fetch(`profile/${user_id}`)
    .then(response => response.json())
    .then(profile => {

        // CLEAR out feed-name
        document.querySelector('#feed-name').innerHTML = '';
        // DISPLAY the feed name
        document.querySelector('#profile-view-feed-name').innerHTML = `${profile.username} posts`;
 
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
        
        // CREATE a BUTTON to TOGGLE-FOLLOW
        const element = document.createElement('button');
        element.id = `toggle-follow-button${user_id}`

        if (follow.is_followed === false) {
            element.innerHTML = "Follow";
            element.className = `btn btn-sm my-btn rounded-pill shadow-sm m-2 pl-3 pr-3`;
            document.querySelector("#profile-following-sign").className = "far fa-star";
        } else {
            element.innerHTML = "Unfollow";
            element.className = `btn btn-sm my-btn rounded-pill shadow-sm m-2`;
            document.querySelector("#profile-following-sign").className = "fas fa-star";
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
                 
                if (document.querySelector(`#toggle-follow-button${user_id}`).innerHTML === "Follow") {
                    fetch(`follow/${user_id}`, {
                        method: 'POST',
                        body: JSON.stringify({
                            user_id: user_id,
                            action: "follow",
                        })
                    }) 
                    .then(response => response.json())
                    .then(follow => {
                        loadProfile(user_id);
                    })
                } else {
                    fetch(`follow/${user_id}`, {
                        method: 'POST',
                        body: JSON.stringify({
                            user_id: user_id,
                            action: "unfollow",
                        })
                    }) 
                    .then(response => response.json())
                    .then(follow => {
                        loadProfile(user_id);
                    })  
                }
            });
        }
    });


    // fetch for user FEED and generate POST for each entry                           
    feed = user_id;
    fetch(`feed/${feed}`)
    .then(response => response.json())
    .then(pages => {
        //onsole.log(`PAGES ==>`, pages);

        // CLEAR out old FEED before render new FEED
        document.querySelector("#feed-view-all").innerHTML = "";
        document.querySelector("#feed-view-all-paginator").innerHTML = "";
        
        document.querySelector("#feed-view-following").innerHTML = "";
        document.querySelector("#feed-view-following-paginator").innerHTML = "";
        
        document.querySelector("#profile-view-feed").innerHTML = "";
        document.querySelector("#profile-view-feed-paginator").innerHTML = "";
        
        document.querySelector("#feed-view-no").innerHTML = "";

        // Display custom message case FEED has NO POSTS
        if (pages.length == 1 && pages[0].posts == "") {
            document.querySelector("#feed-view"). innerHTML +=
            `<div class="row my-text mt-3 justify-content-center"
                <div class="col-6  text-center">
                    This feed has no posts yet.
                </div>
            </div>`;

        // **************** THIS SECTION must be equal to index analog section    
        } else {
            // By default load page 1 (pages[0]) with respective posts and feed paginator
            generatePage(pages[0], feed, pages.length);
        
            pages[0].posts.forEach(post => {
                generatePost(post, pages[0], feed);
            });

            generatePaginator(feed, pages.length);
            var actual_page_number = pages[0].number;
            
            handlePaginatorButtons(feed, pages, actual_page_number);
        }
    });
}

