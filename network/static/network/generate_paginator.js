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

} 


    /*
    // CREATE paginator BUTTONS for page
    const paginator_previous = document.createElement('li');
    paginator_previous.id = `previous-feed${feed}-page${page.number}`;
    paginator_previous.className = `page-item`
    paginator_previous.innerHTML = 
        `<a class="page-link my-text my text-hover">
            <i class="fas fa-angle-double-left"></i>
        </a>`;
    
    const paginator_actual = document.createElement('li');
    paginator_actual.id = `actual-feed${feed}-page${page.number}`;
    paginator_actual.className = `page-item`
    paginator_actual.innerHTML = `<a class="page-link">${page.number}</a>`;
    
    const paginator_next = document.createElement('li');
    paginator_next.id = `next-feed${feed}-page${page.number}`;
    paginator_next.className = `page-item`
    paginator_next.innerHTML = 
        `<a class="page-link my-text my text-hover">
            <i class="fas fa-angle-double-right"></i>
        </a>`;
    
    
    // CREATE PAGINATOR DIV
    const paginator= document.createElement('div');
    paginator.style.display = 'block';
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

    */