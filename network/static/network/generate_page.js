function generatePage(page, feed, num_pages) {

    num_pages = num_pages
    posts = page.posts;
    has_next = page.has_next;
    has_previous = page.has_previous;
    
    console.log(feed);
    console.log(page.number);

    // CREATE and RENDER PAGE DIV (to receive posts)
    const element = document.createElement('div');

    // RENDER PAGE DIV for FEED
    if (feed === "all") {   
        
        element.id = `feed-view-all-page-${page.number}`;
        document.querySelector("#feed-view-all").append(element);

    } else  if (feed == "following") {
        
        element.id = `feed-view-following-page-${page.number}`;
        document.querySelector("#feed-view-following").append(element);
    
    } else{
        
        element.id = `profile-view-feed-page-${page.number}`;
        document.querySelector("#profile-view-feed").append(element);
    }
}
