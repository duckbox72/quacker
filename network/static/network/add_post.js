document.addEventListener('DOMContentLoaded', function() {

    const form = document.querySelector("#post-form");

    form.addEventListener('submit', (event) => {
        let text = document.querySelector("#post-form-text");
        console.log(`Text: ${text.value}`);
        console.log('YOU CLICKED THE BUTTON');

        // POST requert to add a post
        fetch('/posts', {
            method: 'POST',
            body: JSON.stringify({
                text: text.value,
            }) 
        })
        .then(response => response.json())
        .then(result => { 
            if (result.error) {
                alert(result.error);     
            }
            if (result.message) {
                console.log(result.message);
            } 
        })
        return false;
    })
});