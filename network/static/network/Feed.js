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

            toggle_like_className: "far fa-heart text-dark",
            num_likes: 0,
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
                      <div className="ToggleLike col m-2">
                          <i onClick={this.toggle_like} key={post.id} id={post.id} className={this.state.toggle_like_className} style={{fontSize: "14px"}}></i><span id="num-likes${post.id}" className="ml-1" style={{fontSize: "14px"}}>{this.state.num_likes}</span>  
                      </div>
                    </div>
                  </div>
                </div>
              </div>  
            ))}
          </div>
        );
      }
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



