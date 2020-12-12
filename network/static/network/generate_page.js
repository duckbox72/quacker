function generatePage(page, feed, num_pages) {

    num_pages = num_pages
    posts = page.posts;
    has_next = page.has_next;
    has_previous = page.has_previous;
    
    console.log(feed);
    console.log(page.number);

    // CREATE and RENDER *PAGE DIV* and *PAGINATOR DIV* for each page
    const element = document.createElement('div');
    element.style.display = 'none';
    
    const paginator= document.createElement('div');
    paginator.style.display = 'none';
    paginator.id = `paginator-${feed}-${page.number}`
    paginator.innerHTML = 
        `<div class="row small justify-content-center mt-3">
            <div class="col-6">
                <nav>
                    <ul id="ul-${feed}-${page.number}" class="pagination justify-content-center my-text my-text-hover">
                        
                    </ul>
                </nav>
            </div>
        </div>
        `;


    if (feed === "all-posts") {
        if (page.number === 1) {
            element.style.display = 'block';
            paginator.style.display = 'block';    
        }

        element.id = `feed-view-all-page-${page.number}`;
        document.querySelector("#feed-view-all").append(element);
        
        document.querySelector("#feed-view-all-paginator").append(paginator);

        for (i = 1; i <= num_pages ; i++) {
            list_item = `<li id="li-${feed}-${page.number}-button${i}" class="page-item">
                            <a class="page-link">${i}</a>
                        </li>`
            document.querySelector(`#ul-${feed}-${page.number}`).innerHTML += list_item;
        }
        
    } else  if (feed == "following") {
        if (page.number === 1) {
            element.style.display = 'block';
            paginator.style.display = 'block';  
        }
        
        element.id = `feed-view-following-page-${page.number}`;
        document.querySelector("#feed-view-following").append(element);

        paginator.id = `feed-view-following-paginator-${page.number}`;
        document.querySelector("#feed-view-following-paginator").append(paginator);

    } else{
        if (page.number === 1) {
            element.style.display = 'block'; 
            paginator.style.display = 'block'; 
        }
        
        element.id = `profile-view-feed-page-${page.number}`;
        document.querySelector("#profile-view-feed").append(element);

        paginator.id = `#profile-view-feed-paginator-${page.number}`;
        document.querySelector("#profile-view-feed-paginator").append(paginator);
    }
}
