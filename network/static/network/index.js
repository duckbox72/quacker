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
    document.querySelector('#feed-name').innerHTML = 
                            `<div class="row justify-content-center mt-2">
                                <div class="col my-text text-right">
                                    ${feed}
                                </div>
                            </div>`;

    // Fetch feed for posts from API ROUTE
    fetch(`feed/${feed}`)
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
        
        // If there are posts iteract though them 
        posts.forEach(post => {
            generatePost(post, feed)
        });
    })

}