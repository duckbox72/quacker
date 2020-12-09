document.addEventListener('DOMContentLoaded', function() {
    // Use buttons to toggle between views
    document.querySelector('#index').addEventListener('click', () => loadFeed('all posts'));
    document.querySelector('#following').addEventListener('click', () => loadFeed('following'));
    
    user_id = document.querySelector("#username").name
    document.querySelector('#profile').addEventListener('click', () => loadProfile(user_id));
    
    // By default, load  all posts feed
    loadFeed('all posts');
})

function loadFeed(feed) {
    // TOGGLE VIEW
    document.querySelector('#feed-view').style.display = 'block';
    document.querySelector('#profile-view').style.display = 'none';

    // CLEAR out form text field
    document.querySelector('#post-form-text').value = '';

    // DISPLAY the feed name
    document.querySelector('#feed-name').innerHTML = feed;
                            
    // RETRIEVE USER_ID
    user_id = document.querySelector("#username").name
    
    fetch(`profile/${user_id}`)
    .then(response => response.json())
    .then(profile => {
        if (profile.photo_name !== "") {
            document.querySelector("#post-form-photo").src = `${profile.photo_name}`
        }
    });

    // Fetch feed for posts from API ROUTE
    fetch(`feed/${feed}`)
    .then(response => response.json())
    .then(posts => {
        console.log(posts)
        
        // CLEAR out old FEED before render new FEED
        document.querySelector("#feed-view-following").innerHTML = "";
        document.querySelector("#feed-view-all").innerHTML = "";
        document.querySelector("#profile-view-feed").innerHTML = "";
        document.querySelector("#feed-view-no").innerHTML = "";
        

        // Display custom message case FEED has NO POSTS
        if (posts.length == 0) {
            document.querySelector("#feed-view-no"). innerHTML =
            `<div class="row my-text mt-3 justify-content-center">
                <div class="col-6  text-center">
                    You are not following anyone.
                </div>
            </div>`;
        };

        // If there are posts iteract though them 
        posts.forEach(post => {
            generatePost(post, feed);
        });

        generatePage(posts);

        document.querySelector("#feed-view-paginator").innerHTML =
        `<div class="row small justify-content-center mt-3">
            <nav aria-label="Feed Navigation">
                <ul class="pagination">
                <li class="page-item">
                    <a class="page-link my-text my text-hover" href="#" aria-label="Previous">
                    <span aria-hidden="true"><i class="fas fa-angle-double-left"></i></span>
                    </a>
                </li>
                <li class="page-item"><a class="page-link  my-text my text-hover" href="#">1</a></li>
                <li class="page-item"><a class="page-link  my-text my text-hover" href="#">2</a></li>
                <li class="page-item"><a class="page-link  my-text my text-hover" href="#">3</a></li>
                    <a class="page-link my-text my text-hover" href="#" aria-label="Next">
                    <span aria-hidden="true"><i class="fas fa-angle-double-right"></i></span> 
                    </a>
                </li>
                </ul>
            </nav>
        </div>`

    })

}