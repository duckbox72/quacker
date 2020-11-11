document.addEventListener('DOMContentLoaded', function() {
  // By default, load  all posts feed
  load_feed('all posts');
});


function load_feed(feed) {
    // Show the feed view and hide other views
    document.querySelector('#feeds-view').style.display = 'block';

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
            const element = document.createElement('div');
            element.className = `row justify-content-center`
            element.innerHTML = 
                `<div class="col-lg-6 border rounded shadow-sm bg-white">
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
                        Number of Likes 
                    </div>
                </div>   
            </div>`;

            document.querySelector("#feeds-view").append(element)
        });
        

    }); 
}