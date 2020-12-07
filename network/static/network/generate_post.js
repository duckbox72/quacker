function generatePost(post, feed) {

    function getToggleLikeClass(is_liked) {
        return (is_liked ? "fas fa-heart text-danger" : "far fa-heart text-dark");
    }

    function getToggleEditClass(can_edit) {
        return (can_edit  ? "far fa-edit text-dark" : "");
    }

    // CREATE a DIV for each post
    const element = document.createElement('div');
    element.className = `row justify-content-center`;
    element.id = `post${post.id}`;
    element.innerHTML = 
    `<div class="col-lg-6 border shadow-sm bg-white">
        <div class="row">
            <div class="col p-1 ml-3 small my-text font-weight-bolder">     
                
                <img src="${post.photo_name}" alt="..." 
                    style="height: 20px; width: 20px; object-fit: cover; border-radius: 10px;">
                <span id="profile-user${post.user_id}-post${post.id}" class="pl-1 my-text-hover">
                @${post.username} 
                </span>
                
            </div>
            <div class="col small my-text text-right font-weight-lighter pt-1">
                ${post.created.toLowerCase()}
            </div>
        </div>
        <div id="toggle-view${post.id}" class="row">
            <div class="col small font-weight-lighter ml-3 mr-3 mt-2 pb-1" style="min-height: 52px;">
                ${post.text}
            </div>
        </div>
        <div class="row">
            <div class="col-2 ml-2 mt-2 mb-2">
                <i id="toggle-like${post.id}" class="${getToggleLikeClass(post.is_liked)}" style="font-size: 14px;"></i><span id="num-likes${post.id}" class="ml-1" style="font-size: 14px;">${post.num_likes}</span>
            </div>
            
            <div class="col-2 ml-2 mt-2 mb-2">
                <i id="toggle-edit${post.id}" class="${getToggleEditClass(post.can_edit)}" style="font-size: 14px;"></i>      
            </div>

            <div class="col-2 ml-2 mt-2 mb-2">
                <i id="update${post.id}" class="" style="font-size: 14px; margin-left: 12px"><span id="update-span${post.id}" style="font-family: sans-serif; font-size: 12px; margin-left: 4px"></span></i>     
            </div>

            <div class="col-2 mt-2 mb-2">
                <i id="cancel${post.id}" class="" style="font-size: 14px; margin-left: 12px"><span id="cancel-span${post.id}" style="font-family: sans-serif; font-size: 12px; margin-left: 4px"></span></i>     
            </div>

            <div class="col-2 mt-2 mb-2">
                <a href="./"><i id="delete${post.id}" class="" style="font-size: 14px; margin-left: 12px"><span id="delete-span${post.id}" style="font-family: sans-serif; font-size: 12px; margin-left: 4px"></span></i></a>     
            </div>

        </div>   
    </div>`;

    // RENDER a DIV element for each post ------------------------------ RENDER DIV
    if (feed === "all posts") {
        document.querySelector("#feed-view-all").append(element);
    } else  if (feed == "following") {
        document.querySelector("#feed-view-following").append(element);
    } else{
        document.querySelector("#profile-view-feed").append(element);
    }

    // Add EVENT HANDLER to @USERNAME CLICK
    document.querySelector(`#profile-user${post.user_id}-post${post.id}`).addEventListener('click', function() { 
        loadProfile(post.user_id);
    });

    // Add EVENT HANDLER to LIKE BUTTON CLICK
    document.querySelector(`#toggle-like${post.id}`).addEventListener('click', function() {
        
        console.log(`CLICK toggle-like ${post.id}`);
        
        // CHECK with GET request if post is_liked by user
        fetch(`like/${post.id}`)
        .then(response => response.json())
        .then(is_liked => {  
            // No message means is_like exists
            if (!is_liked.message) {
                console.log(`FROM LIKED POST ${post.id} => ${is_liked.post} TO NON LIKED!`);              
                fetch(`like/${post.id}`, {
                    method: 'POST',
                    body: JSON.stringify({
                        post: post.id,
                        action: "delete",
                    })
                })   
                .then(response => response.json())
                .then(post => {
                    console.log(post)
                })
            } else {
                console.log(`FROM NOT LIKED POST ${post.id} - TO LIKED`);
                fetch(`like/${post.id}`, {
                    method: 'POST',
                    body: JSON.stringify({
                        post: post.id,
                        action: "create",
                    })
                })
                .then(response => response.json())
                .then(like => {
                    console.log(like)
                }) 
            }
        })
        
        // TOGGLE LIKE 
        if (document.querySelector(`#toggle-like${post.id}`).className === "far fa-heart text-dark") {
            // FROM NO LIKE to LIKE 
            document.querySelector(`#toggle-like${post.id}`).className = "fas fa-heart text-danger";
            
            before = document.querySelector(`#num-likes${post.id}`).innerHTML;
            after = parseInt(before) + 1 
            document.querySelector(`#num-likes${post.id}`).innerHTML = after; 
        } else {
            // FROM LIKE to UNLIKE 
            document.querySelector(`#toggle-like${post.id}`).className = "far fa-heart text-dark";
            
            before = document.querySelector(`#num-likes${post.id}`).innerHTML;
            after = parseInt(before) - 1 
            document.querySelector(`#num-likes${post.id}`).innerHTML = after; 
        }
    });

    // HANDLE EDIT BUTTON CLICK
    document.querySelector(`#toggle-edit${post.id}`).addEventListener('click', function() {
        console.log(`CLICK toggle-edit on POST ${post.id}`);

        // TOGGLE EDIT rendering changes
        if (document.querySelector(`#toggle-edit${post.id}`).className === "far fa-edit text-dark") {
        
            // FROM VIEW MODE to EDIT MODE
            document.querySelector(`#toggle-edit${post.id}`).className = "fas fa-edit text-dark";
            
            document.querySelector(`#update${post.id}`).className = "far fa-check-circle text-dark";
            document.querySelector(`#update-span${post.id}`).innerHTML = "update";
            
            document.querySelector(`#cancel${post.id}`).className = "far fa-times-circle text-dark";
            document.querySelector(`#cancel-span${post.id}`).innerHTML = "cancel";

            document.querySelector(`#delete${post.id}`).className = "far fa-trash-alt text-dark";
            document.querySelector(`#delete-span${post.id}`).innerHTML = "delete";

            document.querySelector(`#toggle-view${post.id}`).innerHTML = 
                `<div class="col mt-1">
                    <textarea 
                    id="post-form-text${post.id}" 
                    class="form-control" 
                    type="text" 
                    required 
                    autofocus
                    maxlength="256" 
                    style="font-size: 14px;"
                    >${post.text}</textarea>
                </div>`;          
        } else {
        
            // FROM EDIT MODE to VIEW MODE
            document.querySelector(`#toggle-edit${post.id}`).className = "far fa-edit text-dark";
            
            document.querySelector(`#update${post.id}`).className = "";
            document.querySelector(`#update-span${post.id}`).innerHTML = "";
            
            document.querySelector(`#cancel${post.id}`).className = ""; 
            document.querySelector(`#cancel-span${post.id}`).innerHTML = "";

            document.querySelector(`#delete${post.id}`).className = "";
            document.querySelector(`#delete-span${post.id}`).innerHTML = "";

            document.querySelector(`#toggle-view${post.id}`).innerHTML = 
                `<div class="col small font-weight-lighter ml-3 mr-3 pt-1 pb-1" style="min-height: 60px;">
                    ${post.text}
                </div>`;
        }
    });

    // HANDLE UPDATE BUTTON CLICK
    document.querySelector(`#update${post.id}`).addEventListener('click', function() {
        console.log('UPDATE CLICKED')
        
        const text = document.querySelector(`#post-form-text${post.id}`).value;
        fetch(`edit/${post.id}`, {
            method: 'POST',
            body: JSON.stringify({
            text: text,
            })
        })
        .then(response => response.json())
        .then(new_post => {
            
            console.log(new_post)
            // FROM EDIT MODE to VIEW MODE
        
            document.querySelector(`#toggle-edit${post.id}`).className = "far fa-edit text-dark";
            
            document.querySelector(`#update${post.id}`).className = "";
            document.querySelector(`#update-span${post.id}`).innerHTML = "";
            
            document.querySelector(`#cancel${post.id}`).className = ""; 
            document.querySelector(`#cancel-span${post.id}`).innerHTML = "";

            document.querySelector(`#delete${post.id}`).className = "";
            document.querySelector(`#delete-span${post.id}`).innerHTML = "";

            document.querySelector(`#toggle-view${post.id}`).innerHTML = 
                `<div class="col small font-weight-lighter ml-3 mr-3 pt-1 pb-1" style="min-height: 60px;">
                    ${new_post.text}
                </div>`;
            post.text = new_post.text;
        }); 
    });

    // HANDLE CANCEL BUTTON CLICK
    document.querySelector(`#cancel${post.id}`).addEventListener('click', function() {
        console.log('CANCEL CLICKED')
        // FROM EDIT MODE to VIEW MODE
        document.querySelector(`#toggle-edit${post.id}`).className = "far fa-edit text-dark";
        
        document.querySelector(`#update${post.id}`).className = "";
        document.querySelector(`#update-span${post.id}`).innerHTML = "";
        
        document.querySelector(`#cancel${post.id}`).className = ""; 
        document.querySelector(`#cancel-span${post.id}`).innerHTML = "";

        document.querySelector(`#delete${post.id}`).className = "";
        document.querySelector(`#delete-span${post.id}`).innerHTML = "";

        document.querySelector(`#toggle-view${post.id}`).innerHTML = 
            `<div class="col small font-weight-lighter ml-3 mr-3 pt-1 pb-1" style="min-height: 60px;">
                ${post.text}
            </div>`;
    });

    // HANDLE DELETE BUTTON CLICK ---> FETCH ERASE/POST
    document.querySelector(`#delete${post.id}`).addEventListener('click', function() {
        console.log('DELETE CLICKED')

        fetch(`erase/${post.id}`, {
            method: 'POST',
            body: JSON.stringify({
            erase: true,
            })
        })
        .then(response => response.json())
        
    });

}