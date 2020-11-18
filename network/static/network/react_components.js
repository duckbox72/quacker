/*
class TotalLikes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            total_likes: 0,
        };
    }
    render() {
        return <span>{this.state.total_likes}</span>
    }
}
*/
//ReactDOM.render(<TotalLikes />, document.querySelector("#total-likes"));


class PostEntry extends React.Component {
          
    constructor(props) {
        super(props);
        
        this.state = {
            name: "post_entry1",
            id: 33,
            username: "duckdev",
            user_email: "email@example.com",
            text: "Body text example.",
            created : "date created",
            
            toggle_like_className: "far fa-heart text-dark",
            
            toggle_like: false,
            num_likes: 0,
        };
    }
    
    render() {
        return (
        <div className="row justify-content-center">
            <div id={this.state.id} className="col-lg-6 border rounded-lg shadow-sm bg-white">
                <div className="row">
                    <div className="col p-1 ml-3 small my-text font-weight-bolder">
                        @{this.state.username}
                    </div>
                    <div class="col small my-text text-right font-weight-lighter pt-1">
                        ${this.state.created}
                    </div>
                </div>
                <div className="row">
                    <div className="col small font-weight-lighter ml-3 mr-3 pt-1 pb-1" style={{minHeight: "60px"}}>
                        {this.state.text}
                    </div>
                </div>
                <div className="row">
                    <div className="col m-2">
                        <i onClick={this.toggle_like} id="toggle_like${post.id}" className={this.state.toggle_like_className} style={{fontSize: "14px"}}></i><span id="num-likes${post.id}" className="ml-1" style={{fontSize: "14px"}}>{this.state.num_likes}</span> 
                    </div>
                </div>
            </div>
        </div>);
        
    }

    // UPDATE STATE
    toggle_like = () => {
        
        if ((this.state.toggle_like_className) === "far fa-heart text-dark") {
            this.setState(state => ({
                toggle_like_className: "fas fa-heart text-danger",
                num_likes: this.state.num_likes + 1
            }));
        } else {
            this.setState(state => ({
                toggle_like_className: "far fa-heart text-dark",
                num_likes: this.state.num_likes - 1
            }));
        }
    }
}

ReactDOM.render(<PostEntry />, document.querySelector("#post-entry"));




