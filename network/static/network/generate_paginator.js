function generatePaginator(page, feed) {
    
    // CLEAR out last 
    document.querySelector("#feed-view-all-paginator").innerHTML = "";
    document.querySelector("#feed-view-following-paginator").innerHTML = "";
    document.querySelector("#profile-view-feed-paginator").innerHTML = "";
    
    
    console.log(feed);
    console.log(page.number);
    
    const paginator = document.createElement('div');
    paginator.style.display = 'none';
    paginator.className = "row small justify-content-center mt-3";
    paginator.innerHTML = 
        `<nav aria-label="Feed Navigation" class="col-6 text-center">
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
        </nav>`;

        if (feed === "all-posts") {
            if (page.number === 1) {
                paginator.style.display = 'block'; 
            }
            paginator.id = `paginator${page.number}`;
            document.querySelector(`#feed-view-all-paginator-${page.number}`).innerHTML = "KKKKK";
    
            
        } else  if (feed == "following") {
            if (page.number === 1) {
                element.style.display = 'block';
                paginator_div.style.display = 'block';  
            }
            
            element.id = `feed-view-following-page-${page.number}`;
            document.querySelector("#feed-view-following").append(element);
    
            paginator_div.id = `feed-view-following-paginator-${page.number}`;
            document.querySelector("#feed-view-following-paginator").append(paginator_div);
    
        } else{
            if (page.number === 1) {
                element.style.display = 'block'; 
                paginator_div.style.display = 'block'; 
            }
            
            element.id = `profile-view-feed-page-${page.number}`;
            document.querySelector("#profile-view-feed").append(element);
    
            paginator_div.id = `#profile-view-feed-paginator-${page.number}`;
            document.querySelector("#profile-view-feed-paginator").append(paginator_div);
    
        }

}




/*
document.querySelector("#feed-view-paginator").innerHTML =
        `<div class="row small justify-content-center mt-3">
           
        </div>`
*/