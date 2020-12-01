class AddPostForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {     
      form_text_value: "",
    };
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleTextChange = (event) => {
    this.setState({
      form_text_value: event.target.value,
    });
  }

  handleSubmit = (event) => {
    const text = this.state.form_text_value;
    fetch('/posts', {
      method: 'POST',
      body: JSON.stringify({
          text: text,
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
        
        this.setState({
          form_text_value: "",
        });

        this.props.parentCallbackSubmitted(true);
    }) 
  }

  render() {
    console.log(this.state.form_text_value)
    return(
      <div className="row justify-content-center mb-2"> 
        <div className="col-lg-6 border rounded-lg shadow-sm bg-white">
          <form id="post-form">
            <div className="row">
              <div className="col pt-1 ml-2">
                  <span className="small my-text font-weight-bolder">new quacK </span><i id="fa-rss" className="fas fa-rss"></i> 
              </div>
            </div>
            <div className="row mt-1">
              <div className="col">
                  <textarea 
                  onChange={this.handleTextChange}
                  className="form-control border-0 " 
                  type="text" 
                  value={this.state.form_text_value} 
                  placeholder="What are you thinking?" 
                  required maxLength="256"
                  style={{fontSize: "14px"}}
                  ></textarea>
              </div>
            </div>
            <div className="row">
              <div className="col text-right">
                  <button onClick={this.handleSubmit} className="btn btn-sm my-btn rounded-pill shadow-sm  m-2" type="submit">quacK <i id="fa-rss-white" className="fas fa-rss"></i></button>
              </div>
            </div>    
          </form>    
        </div>
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
    this.handleToggleLike = this.handleToggleLike.bind(this);
  }
  
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
      <i onClick={this.handleToggleLike}  
         className={this.state.is_liked ? "fas fa-heart text-danger" : "far fa-heart text-dark"} 
         style={{fontSize: "14px"}}></i>
         <span id="num-likes" className="ml-1" style={{fontSize: "14px"}}>{this.state.num_likes}</span>  
    </div>
    );
  }
}


class ToggleEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post_id: this.props.post_id,
      can_edit: this.props.can_edit,
      post_edited: this.props.post_edited,
      
      toggle_edit: false,   
    };
    this.handleToggleEdit = this.handleToggleEdit.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleCancel = () => {
    console.log(`CANCEL CICKED!`)
    this.setState({
      toggle_edit: false,
    });
    this.props.parentCallbackView("view");
  }
  
  handleSave = () => {
    console.log(`SAVE CLICKED!`)
    this.setState({
      toggle_edit: false,
    });
    this.props.parentCallbackSave(true);
  }
 
  handleToggleEdit = () => {
    console.log(`TOGGLE EDIT CLICKED!  POST ${this.state.post_id}`)
    if (this.state.toggle_edit === false) {
      this.setState({
        toggle_edit: true
      });
      this.props.parentCallbackView("edit");
    } else {
      this.setState({
        toggle_edit: false,
      });
      this.props.parentCallbackView("view");
    }
  }
 
  render() {
    if (this.state.can_edit === true) {
      return (
        
        <div className="col m-2">
          <i onClick={this.handleToggleEdit}  className={this.state.toggle_edit ? "fas fa-edit text-dark" : "far fa-edit text-dark" } style={{fontSize: "14px"}}></i>
          
          <i onClick={this.handleSave}  className={this.state.toggle_edit ? "far fa-check-circle text-secondary" : "" } style={{fontSize: "14px", marginLeft: "12px"}}><span style={{fontSize: "10px", marginLeft: "4px"}}>{this.state.toggle_edit ? "update" : "" }</span></i>
          
          <i onClick={this.handleCancel}  className={this.state.toggle_edit ? "far fa-times-circle text-secondary" : "" } style={{fontSize: "14px", marginLeft: "8px"}}><span style={{fontSize: "10px", marginLeft: "4px"}}>{this.state.toggle_edit ? "cancel" : "" }</span></i>
          
        </div>
        
      );
    } else {
      return <div></div>;
    }
  }
}


class PostView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {     
      post: this.props.post,
      form_text_value: this.props.post.text,
      view_mode: this.props.view_mode,
    };
    this.callbackSave = this.callbackSave.bind(this);
    this.callbackViewMode = this.callbackViewMode.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  callbackSave = () => {
    console.log(`REMOTE SAVE TRIGGERED FROM CHILDREN`);
    this.handleSubmit()
  }

  callbackViewMode = (view_mode) => {
    console.log(`MODE RETRIEVED FROM CHILDREN ${view_mode}`);
    this.setState({
      view_mode: view_mode,
    });
  }

  handleTextChange = (event) => {
    this.setState({
      form_text_value: event.target.value,
    });
  }

  handleSubmit = (event) => {
    const text = this.state.form_text_value;
    fetch(`edit/${this.state.post.id}`, {
      method: 'POST',
      body: JSON.stringify({
        text: text,
      })
    })
    .then(response => response.json())
    .then(data => {
      this.setState({
        post: data,
        view_mode: "view",
      }); 
    }); 
  }

  render() {
    // VIEW MODE  ---- VIEW ---- // -----------------------------------------------------------------------
    if (this.state.view_mode === "view") {
      return (
        <div className="row justify-content-center">
          <div className="col-lg-6 border rounded-lg shadow-sm bg-white">
            <div className="row">
              <div className="Post-username col p-1 ml-3 small my-text font-weight-bolder">
                  <a className="my-text my-text-hover" href="#">@{this.state.post.username}</a>
              </div>
              <div className="Post-created col small my-text text-right font-weight-normal pt-1">
                  {this.state.post.created}
              </div>
            </div>
            <div className="row">
              <div className="Post-text col small ml-3 mr-3 pt-2 pb-1" style={{minHeight: "64px"}}>
                  {this.state.post.text}
              </div>
            </div>
            <div className="row">
              <ToggleLike key={this.state.post.id} is_liked={this.state.post.is_liked} 
                num_likes={this.state.post.num_likes} post_id={this.state.post.id} />
              <ToggleEdit 
              parentCallbackView={this.callbackViewMode} 
              post_id={this.state.post.id} 
              can_edit={this.state.post.can_edit} 
              post_edited={this.state.post.edited} 
                />
            </div>
          </div>
        </div>
      );
      // VIEW MODE  ---- EDIT ---- // -----------------------------------------------------------------------
    } else {
      return (
        <div className="row justify-content-center">
          <div className="col-lg-6 border rounded-lg shadow-sm bg-white">
            <div className="row">
              <div className="Post-username col p-1 ml-3 small my-text font-weight-bolder">
                  <a className="my-text my-text-hover" href="#">@{this.state.post.username}</a>
              </div>
              <div className="Post-created col small my-text text-right font-weight-normal pt-1">
                  {this.state.post.created}
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6 bg-white">  
                <form>
                  <div className="row mt-1">
                    <div className="col">
                      <textarea 
                      id="post-form-text" 
                      autoFocus={false}
                      value={this.state.form_text_value} 
                      className="form-control mb-2" 
                      type="text" 
                      required maxLength="256"
                      onChange={this.handleTextChange}
                      style={{fontSize: "13px"}}
                      ></textarea>
                    </div>
                  </div>          
                </form>
              </div>
            </div>
            <div className="row">
              <ToggleLike key={this.state.post.id} is_liked={this.state.post.is_liked} 
                num_likes={this.state.post.num_likes} post_id={this.state.post.id} />
              <ToggleEdit 
                parentCallbackView={this.callbackViewMode}
                parentCallbackSave={this.callbackSave} 
                post_id={this.state.post.id} 
                can_edit={this.state.post.can_edit} 
                post_edited={this.state.post.edited}/>
            </div>
          </div>
        </div>
      );
    }
  }
}

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post: this.props.post,
      view_mode: "view"
    }; 
  }

  render() {
    return (
      <div className="Post" key={this.state.post.id} id={this.state.post.id}>               
        
  
        <PostView post={this.state.post} view_mode={this.state.view_mode} />    
          
        
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
          posts: [],

          form_submitted: false,
      };    
      this.callbackSubmitted = this.callbackSubmitted.bind(this)
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
            edit_callback: "", 

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
  
  callbackSubmitted = (value) => {
    console.log(`REMOTE SUBMIT TRIGGERED FROM CHILDREN`);
    this.setState({
      form_submitted: value,
    });
    this.componentDidMount()
  }

  render() {
    const { error, isLoaded, posts } = this.state;
    if (error) {
      return <div className="my-text text-center">Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div className="my-text text-center">Loading... <i className="fas fa-spinner"></i></div>;
    } else {
      return (
        <div>
          <div id="feed-name" className="row justify-content-center mt-2">
              <div className="col-lg-6 my-text text-right bg-white font-weight-bolder">
                  {this.state.feed}
              </div>
          </div>
          
          <AddPostForm parentCallbackSubmitted={this.callbackSubmitted}/>     
          {posts.map(post => (
              <Post key={post.id} post={post}/> 
          ))}
        </div>
      );
    }
  }     
}

ReactDOM.render(<Feed feed="all posts"/>, document.getElementById("feed-view"));

