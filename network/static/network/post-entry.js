class PostEntry extends React.Component {
            
    constructor(props) {
        super(props);
        this.state = {
            username: "FELIPE"
        };
    }
    
    render() {
        return <div>AAA<h1>{this.state.username}</h1></div>
    }
}

ReactDOM.render(<PostEntry />, document.querySelector("#post_entry"));
