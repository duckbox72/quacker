function generatePaginator(feed, num_pages) {
    
    // CLEAR out last 
    document.querySelector("#feed-view-all-paginator").innerHTML = "";
    document.querySelector("#feed-view-following-paginator").innerHTML = "";
    document.querySelector("#profile-view-feed-paginator").innerHTML = "";
        
    console.log(feed);
    console.log(num_pages);

    





    // CREATE PAGINATOR DIV
    const paginator = document.createElement('div');
    paginator.id = `paginator-${feed}`;
    paginator.innerHTML = 
        `<div class="row small justify-content-center mt-3">
            <div class="col-6">
                <nav>
                    <ul id="paginator-${feed}-ul" class="pagination justify-content-center my-text my-text-hover">
                    
                    
                    </ul>
                </nav>
            </div>
        </div>
        `;
    
    
    document.querySelector(`#feed-view-${feed}-paginator`).append(paginator)

    
    
    for (i = 1; i <= num_pages; i++) {
        console.log(i);
        
        
        document.querySelector(`#paginator-${feed}`).append("$$$");

    }

} 



    
    /*
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

    */