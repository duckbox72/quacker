document.addEventListener('DOMContentLoaded', function() {
    // Use buttons to toggle between views
    document.querySelector('#index').addEventListener('click', () => loadFeed('all'));
    document.querySelector('#following').addEventListener('click', () => loadFeed('following'));
    
    user_id = document.querySelector("#username").name
    document.querySelector('#profile').addEventListener('click', () => loadProfile(user_id));
    
    // By default, load  all posts feed
    loadFeed('all');
})

function loadFeed(feed) {
    // TOGGLE VIEW
    document.querySelector('#feed-view').style.display = 'block';
    document.querySelector('#profile-view').style.display = 'none';

    // CLEAR out form text field
    document.querySelector('#post-form-text').value = '';

    // CLEAR out feed-name
    document.querySelector('#feed-name').innerHTML = '';
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

    // Fetch feed for pages and posts from API ROUTE
    fetch(`feed/${feed}`)
    .then(response => response.json())
    .then(pages => {
        // console.log(`PAGES ==>`, pages);
        
        // CLEAR out old FEED before render new FEED   
        document.querySelector("#feed-view-all").innerHTML = "";
        document.querySelector("#feed-view-all-paginator").innerHTML = "";
        
        document.querySelector("#feed-view-following").innerHTML = "";
        document.querySelector("#feed-view-following-paginator").innerHTML = "";
        
        document.querySelector("#profile-view-feed").innerHTML = "";
        document.querySelector("#profile-view-feed-paginator").innerHTML = "";
        
        document.querySelector("#feed-view-no").innerHTML = "";

        // Display custom message case FEED has NO PAGES
        if (pages.length == 1 && pages[0].posts == "") {
            document.querySelector("#feed-view-no"). innerHTML =
            `<div class="row my-text mt-3 justify-content-center">
                <div class="col-6  text-center">
                    You are not following anyone yet.
                </div>
            </div>`;
        
        // In case there are PAGES to be shown
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



