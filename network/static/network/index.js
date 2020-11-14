document.addEventListener('DOMContentLoaded', function() {
  // By default, load  all posts feed
  load_feed('all posts');
});


function load_feed(feed) {
    // Show the feed view and hide other views
    document.querySelector('#feeds-view').style.display = 'block';

    // Clear out form text field
    document.querySelector('#post-form-text').value = '';

    // Show the feed name
    document.querySelector('#feed-name').innerHTML = 
                            `<div class="row justify-content-center mt-2">
                                <div class="col-lg-6">
                                    <p>${feed.charAt(0).toUpperCase() + feed.slice(1)}</p>
                                </div>
                            </div>`;

    // Fetch feed for posts from API ROUTE
    fetch(`feed/${feed}`)
    .then(response => response.json())
    .then(posts => {
        console.log(posts)
        // Display custom message if feed empty
        if (posts.length == 0) {
            document.querySelector("#feeds-view"). innerHTML +=
            `<div class="row justify-content-center"
                <div class="col">
                    This feed has no posts.
                </div>
            </div>`;
        };

        // If there are posts iteract though them and render div element
        posts.forEach(post => {
            // Create toggle_like
            
            const element = document.createElement('div');
            element.className = `row justify-content-center`;
            element.id = `post${post.id}`;
            element.innerHTML = 
            `<div class="col-lg-6 border rounded-lg shadow-sm bg-white p-3">
                <div class="row">
                    <div class="col">
                        ${post.username} <span class="font-weight-lighter text-right">${post.user_email }</span>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        ${post.text}
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        ${post.created}
                    </div>
                </div> 
                <div class="row">
                    <div class="col">
                        <div>
                            <i id="toggle_like${post.id}" class="far fa-heart text-dark"></i> 
                        <div>
                    </div>
                </div>   
            </div>`;

            document.querySelector("#feeds-view").append(element)
            document.querySelector(`#toggle_like${post.id}`).addEventListener('click', function() {
                console.log(`CLICK toggle_like ${post.id}`)
                
                if (document.querySelector(`#toggle_like${post.id}`).className === "far fa-heart text-dark") {
                    document.querySelector(`#toggle_like${post.id}`).className = "fas fa-heart text-danger";
                    
                } else {
                    document.querySelector(`#toggle_like${post.id}`).className = "far fa-heart text-dark";
                }

            });
        
        }); 

    }); 
}