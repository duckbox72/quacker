function handlePaginatorButtons(feed, pages, actual_page_number) {
    
    // Create array to iteract pages when creating handlers
    var pgs = []
    for (i = 1; i <= pages.length; i++){
        pgs.push(i);
    }
    
    // button-ACTUAL HANDLING (create handler for each PAGE BUTTON)
    pgs.forEach(num => {
        document.querySelector(`#button-actual-${feed}-${num}`).addEventListener('click', function() {
            console.log(`CLICKED PAGE NUMBER ${num}`);

            // CLEAR out last 
            document.querySelector("#feed-view-all").innerHTML = "";
            document.querySelector("#feed-view-following").innerHTML = "";
            document.querySelector("#profile-view-feed").innerHTML = "";

            document.querySelector(`#button-actual-${feed}-${actual_page_number}`).className = `page-item`;
            document.querySelector(`#button-actual-${feed}-${num}`).className = `page-item active`;

            // Update actual_page_num
            actual_page_number = num;

            if (actual_page_number === 1){
                document.querySelector(`#button-previous-${feed}`).className = `page-item disabled`;
                document.querySelector(`#button-next-${feed}`).className = `page-item`;
            } else if (actual_page_number === pages.length) {
                document.querySelector(`#button-previous-${feed}`).className = `page-item`;
                document.querySelector(`#button-next-${feed}`).className = `page-item disabled`;
            }
            
            generatePage(pages[actual_page_number - 1], feed, pages.length);  
            pages[actual_page_number - 1].posts.forEach(post => {
                generatePost(post, pages[actual_page_number - 1], feed);
            });
   
        });
    });
    
    // button-PREVIOUS HANDLING
    document.querySelector(`#button-previous-${feed}`).addEventListener('click', function() {
        //console.log('PREVIOUS CLICK');
    
        // CLEAR out last 
        document.querySelector("#feed-view-all").innerHTML = "";
        document.querySelector("#feed-view-following").innerHTML = "";
        document.querySelector("#profile-view-feed").innerHTML = "";
        
        if (actual_page_number > 1) {
            // Update button previous and actual classes
            if (actual_page_number === pages.length){
                document.querySelector(`#button-next-${feed}`).className = `page-item`;
            }
            document.querySelector(`#button-actual-${feed}-${actual_page_number}`).className = `page-item`;

            // Update page number and load next page
            actual_page_number -= 1;

            document.querySelector(`#button-actual-${feed}-${actual_page_number}`).className = `page-item active`;

            generatePage(pages[actual_page_number - 1], feed, pages.length);  
            pages[actual_page_number - 1].posts.forEach(post => {
                generatePost(post, pages[actual_page_number - 1], feed);
            });

            // If page is first disable previous button
            if (actual_page_number === 1) {
                document.querySelector(`#button-previous-${feed}`).className = `page-item disabled`;
            }
        
        } else {  // (actual_page_number === 1) 
            
            generatePage(pages[actual_page_number - 1], feed, pages.length); 
            pages[actual_page_number - 1].posts.forEach(post => {
                generatePost(post, pages[actual_page_number - 1], feed);
            });
            //console.log('NO MORE PAGES TO SHOW');
        }
    
    });
    
    // button-NEXT HANDLING
    document.querySelector(`#button-next-${feed}`).addEventListener('click', function() {
        //console.log('NEXT CLICK');
        
        // CLEAR out last 
        document.querySelector("#feed-view-all").innerHTML = "";
        document.querySelector("#feed-view-following").innerHTML = "";
        document.querySelector("#profile-view-feed").innerHTML = "";           
        
        if (actual_page_number < pages.length) {
            // Update button previous and actual classes
            if (actual_page_number === 1){
                document.querySelector(`#button-previous-${feed}`).className = `page-item`;
            }
            document.querySelector(`#button-actual-${feed}-${actual_page_number}`).className = `page-item`;

            // Update page number and load next page
            actual_page_number += 1;

            document.querySelector(`#button-actual-${feed}-${actual_page_number}`).className = `page-item active`;

            generatePage(pages[actual_page_number - 1], feed, pages.length);  
            pages[actual_page_number - 1].posts.forEach(post => {
                generatePost(post, pages[actual_page_number - 1], feed);
            });

            // If page is last disable next button
            if (actual_page_number === pages.length) {
                document.querySelector(`#button-next-${feed}`).className = `page-item disabled`;
            }
        
        } else {  // (actual_page_number === pages.length) 
            
            generatePage(pages[actual_page_number - 1], feed, pages.length); 
            pages[actual_page_number - 1].posts.forEach(post => {
                generatePost(post, pages[actual_page_number - 1], feed);
            });
            //console.log('NO MORE PAGES TO SHOW');
        }           
    
    });
}