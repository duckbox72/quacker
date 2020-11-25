class ToggleEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      can_edit: this.props.can_edit,
      post_id: this.props.post_id,
    };
    // this binding is necessary to make `this` work in the callback
    this.handleToggleEdit = this.handleToggleEdit.bind(this);
  }

  // UPDATE STATE
  handleToggleEdit = () => {
    console.log(`CLICK!!!!! ${this.state.post_id}`)

  }

  render() {
    return (
    <div className="col-2 m-2">
      <i onClick={this.handleToggleEdit}  className={this.state.can_edit ? "far fa-edit" : ""} style={{fontSize: "14px"}}></i>
    </div>
    );
  }
}


class ToggleLike extends React.Component {
  constructor(props) {
    super(props);
    this.state = {  
      num_likes: this.props.num_likes,
      is_liked: this.props.is_liked,
      post_id: this.props.post_id,
      
    };
    // this binding is necessary to make `this` work in the callback
    this.handleToggleLike = this.handleToggleLike.bind(this);

  }
  
  // UPDATE STATE
  handleToggleLike = () => {  
    if ((this.state.is_liked) === false) {
        console.log("FROM NO_LIKE  TO ====>>>> LIKE")
        this.setState(state => ({
            is_liked: true,
            num_likes: this.state.num_likes + 1
        }));
        fetch(`like/${this.state.post_id}`, {
            method: 'POST',
            body: JSON.stringify({
                post: this.state.post_id,
                action: "create",
            })
        })
        .then(response => response.json())
        .then(like => {
            console.log(like);
        }) 
        
    } else {
        console.log("FROM LIKE  TO ====>>>> NO_LIKE")
        this.setState(state => ({
            is_liked: false,
            num_likes: this.state.num_likes - 1
        }));
        fetch(`like/${this.state.post_id}`, {
          method: 'POST',
          body: JSON.stringify({
              post: this.state.post_id,
              action: "delete",
          })
        })   
        .then(response => response.json())
        .then(post => {
            console.log(post);
        })
    }
  }

  render() {
    return (
    <div className="col-2 m-2">
      <i onClick={this.handleToggleLike}  className={this.state.is_liked ? "fas fa-heart text-danger" : "far fa-heart text-dark"} style={{fontSize: "14px"}}></i><span id="num-likes" className="ml-1" style={{fontSize: "14px"}}>{this.state.num_likes}</span>  
    </div>
    );
  }

}


class Feed extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          error: null,
          isLoaded: false,
          feed: this.props.feed, 
          posts: []
      };
  }

  componentDidMount() {
    fetch(`feed/${this.state.feed}`)
      .then(response => response.json())
      .then(
        (result) => {
          console.log(result)
            this.setState({
            isLoaded: true,
            feed: result.feed,
            posts: result.posts,
            
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
      const { error, isLoaded, posts } = this.state;
      if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        return <div className="my-text text-center">Loading... <i className="fas fa-spinner"></i></div>;
      } else {
        return (
          <div>
            <div className="row justify-content-center mt-2">
                <div className="col-lg-6 my-text text-right bg-white font-weight-bolder">
                    {this.state.feed}
                </div>
            </div>
            {posts.map(post => (
              <div className="Post" key={post.id} id={post.id}>               
                <div className="row justify-content-center">
                  <div className="PostInfo col-lg-6 border rounded-lg shadow-sm bg-white">
                    <div className="row">
                      <div className="Post-username col p-1 ml-3 small my-text font-weight-bolder">
                          @{post.username}
                      </div>
                      <div className="Post-created col small my-text text-right font-weight-normal pt-1">
                          {post.created}
                      </div>
                    </div>
                    <div className="row">
                      <div className="Post-text col small font-weight-lighter ml-3 mr-3 pt-1 pb-1" style={{minHeight: "60px"}}>
                          {post.text}
                      </div>
                    </div>
                    <div className="row">
                      <ToggleLike key={post.id} is_liked={post.is_liked} num_likes={post.num_likes} post_id={post.id} />
                      <ToggleEdit post_id={post.id} can_edit={post.can_edit} />
                    </div>
                  </div>
                </div>
              </div>  
            ))}
          </div>
        );
      }
    }
      
}

ReactDOM.render(<Feed  feed="all posts"/>, document.getElementById("feed-posts"));



class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date()
    };
  }
  componentDidMount() {
    this.timerID = setInterval(
     () => this.tick(),
     1000
    )
  }

  componentWillUnmount() {
    clearInterval(this.timerID)

  }

  tick() {
    this.setState({
      date: new Date
    });
  }

  render() {
    return (
    <div>{this.state.date.toLocaleTimeString()}</div>
  );
  }
}


ReactDOM.render(
  <Clock />,
  document.getElementById('clock')
);



