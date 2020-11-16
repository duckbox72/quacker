class PostEntry extends React.Component {
            
    constructor(props) {
        super(props);
        this.state = {
            id: 1,
            username: "FELIPE",
            user_email: "email@example.com",
            text: "Body text example.",
            created : "date created"
        };
    }
    
    render() {
        return (
        <div className="row justify-content-center">
            <div id={this.state.id} className="col-lg-6 border rounded-lg shadow-sm bg-white p-3">
                <div className="row">
                    <div className="col">
                        {this.state.username} <span className="font-weight-lighter text-right">{this.state.user_email }</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        {this.state.text}
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        {this.state.created}
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <i id='toggle_like`{this.state.id}'className="far fa-heart text-dark"></i>
                    </div>
                </div>
            </div>
        </div>);
        
    }
}

ReactDOM.render(<PostEntry />, document.querySelector("#post_entry"));
