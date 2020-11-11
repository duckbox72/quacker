document.addEventListener('DOMContentLoaded', function() {
  
  
  // By default, load  all posts feed
  load_feed('all');
});


function load_feed(feed) {
    // Show the feed view and hide other views
    document.querySelector('#all-posts-view').style.display = 'block';

    // Show the feed name
    document.querySelector('#all-posts-view').innerHTML = `<h3>${feed.charAt(0).toUpperCase() + feed.slice(1)}</h3>`;

    // Fetch feed for posts from API ROUTE
    fetch(`feed/${feed}`)
    .then(response => response.json())
    .then(posts => {
        console.log(posts)

    }); 
}