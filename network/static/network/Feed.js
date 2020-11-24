class ToggleLike extends React.Component {
  constructor(props) {
    super(props);
    this.state = {  
      num_likes: this.props.num_likes,
      is_liked: this.props.is_liked,
      
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
    } else {
        console.log("FROM LIKE  TO ====>>>> NO_LIKE")
        this.setState(state => ({
            is_liked: false,
            num_likes: this.state.num_likes - 1
        }));
    }
  }

  render() {
    return (
    <div className="col m-2">
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
          feed: "all posts", 
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
            {posts.map(post => (
              <div className="Post" key={post.id} id={post.id}>               
                <div className="row justify-content-center">
                  <div className="PostInfo col-lg-6 border rounded-lg shadow-sm bg-white">
                    <div className="row">
                      <div className="Post-username col p-1 ml-3 small my-text font-weight-bolder">
                          @{post.username}
                      </div>
                      <div className="Post-created col small my-text text-right font-weight-lighter pt-1">
                          {post.created}
                      </div>
                    </div>
                    <div className="row">
                      <div className="Post-text col small font-weight-lighter ml-3 mr-3 pt-1 pb-1" style={{minHeight: "60px"}}>
                          {post.text}
                      </div>
                    </div>
                    <div className="row">
                      <ToggleLike key={post.id} is_liked={post.is_liked} num_likes={post.num_likes} />
                  
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

ReactDOM.render(<Feed  />, document.getElementById("feed-posts"));



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



