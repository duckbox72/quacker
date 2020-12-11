function generatePage(page, feed) {

    console.log(feed)
    console.log(page.number);
    posts = page.posts;
    has_next = page.has_next;
    has_previous = page.has_previous;
    
    // CREATE and RENDER *PAGE DIV* and *PAGINATOR DIV* for each page
    const element = document.createElement('div');
    element.style.display = 'none';
    
    const paginator = document.createElement('div');
    paginator.style.display = 'none';

    if (feed === "all posts") {
        if (page.number === 1) {
            element.style.display = 'block';
            paginator.style.display = 'block'; 
        }

        element.id = `feed-view-all-page-${page.number}`;
        document.querySelector("#feed-view-all").append(element);

        paginator.id = `feed-view-all-paginator-${page.number}`;
        document.querySelector("#feed-view-all-paginator").append(paginator);

        
    } else  if (feed == "following") {
        if (page.number === 1) {
            element.style.display = 'block';
            paginator.style.display = 'block';  
        }
        
        element.id = `feed-view-following-page-${page.number}`;
        document.querySelector("#feed-view-following").append(element);

        paginator.id = `feed-view-following-paginator-${page.number}`;
        document.querySelector("#feed-view-following-paginator").append(element);

    } else{
        if (page.number === 1) {
            element.style.display = 'block'; 
            paginator.style.display = 'block'; 
        }
        
        element.id = `profile-view-feed-page-${page.number}`;
        document.querySelector("#profile-view-feed").append(element);

        paginator.id = `#profile-view-feed-paginator-${page.number}`;
        document.querySelector("#profile-view-feed-paginator").append(element);

    }
}
