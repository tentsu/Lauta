  
var Lauta = React.createClass({displayName: 'Lauta',
//    componentWillMount: function(){
//        console.log(this.props)
//       var scope = this.props.scope;
//           scope.Lauta.react = this;
//    },
    getDefaultProps: function() {
        return {
            threads: []
        };
    },
    propTypes: {
        name : React.PropTypes.string.isRequired,
        age : React.PropTypes.string.isRequired,
        threads : React.PropTypes.array.isRequired,
    },
    render: function() {
        return (
            React.createElement("div", {className: "threadBox"}, 
            React.createElement("h1", null, "Lauta"), 
            React.createElement(ThreadList, {data: this.props.threads})
            )
        );
    }
});


var ThreadList = React.createClass({displayName: 'ThreadList',
    render: function() {
//        console.log(this.props.data)
        var threads = this.props.data.map(function(thread, index) {
            return Thread(thread);
        });
        
        return (
            React.createElement("div", {className: "threadList"}, 
                threads
            )
        );
    }
});

var Thread = React.createClass({displayName: 'Thread',
    render: function() {
        var answers = this.props.answers.map(function(answer, index) {
            return Answer(answer);
        });
//        console.log(this.props)
        return (
            React.createElement("div", {className: "thread"}, 
                Answer(this.props.op), 
                answers
            )
        );
    }
});

var Answer = React.createClass({displayName: 'Answer',
    getInitialState: function() {
        return {
            op: false,
            full: false
        };
    },
    handleClick: function(event) {
        console.log("image clicked")
        this.setState({full: !this.state.full});
    },
    render: function() {
        console.log(this.props)
        var cx = React.addons.classSet;
        var full = cx({
            'full': this.state.full
        });
        
        var op = (this.props.op) ? cx({
            'op': true,
            'answer': false
        }) : cx({
            'op': false,
            'answer': true
        });
        
        return (
            React.createElement("div", {className: op}, 
                React.createElement("img", {onClick: this.handleClick, className: full, src: this.props.img}), 
                this.state.full, 
                React.createElement("div", {className: "author"}, 
                    this.props.author
                ), 
                React.createElement("div", {className: "time"}, 
                    this.props.time
                ), 
                React.createElement("div", {className: "message"}, 
                    this.props.message
                )
            )
        );
    }
});

//
//React.renderComponent(
//    <Lauta pollInterval={2000} />,
//    document.getElementById("react")
//);


//var Thread = React.createClass({
//    render: function() {
//        return (
//            <div className="thread">
//                <img src={this.props.img} />
//                <div className="author">
//                    {this.props.author}
//                </div>
//                <div className="time">
//                    {this.props.time}
//                </div>
//                <div className="message">
//                    {this.props.message}
//                </div>
//            </div>
//        );
//    }
//});
//        
//        
//var ThreadList = React.createClass({
//    render: function() {
//        var threads = this.props.data.map(function(thread, index) {
//            return Thread(thread);
//        });
//        
//        return (
//            <div className="threadList">
//                {threads}
//            </div>
//        );
//    }
//});
//
//
//var Lauta = React.createClass({
////  loadThreadsFromServer: function() {
////    $.ajax({
////      url: this.props.url,
////      dataType: 'json',
////      success: function(data) {
////        this.setState({data: data});
////      }.bind(this),
////      error: function(xhr, status, err) {
////        console.error(this.props.url, status, err.toString());
////      }.bind(this)
////    });
////  },
////  getInitialState: function() {
////    return {data: []};
////  },
////  componentDidMount: function() {
////    this.loadThreadsFromServer();
////    setInterval(this.loadThreadsFromServer, this.props.pollInterval);
////  },
//    
//    componentWillMount: function(){
//       var scope = this.props.scope;
//        console.log(scope)
////           scope.Lauta. = this;
//    },
//  render: function() {
//    return (
//      <div className="threadBox">
//        <h1>Lauta</h1>
//        <ThreadList data={this.scope} />
//      </div>
//    );
//  }
//});
//
//
//React.renderComponent(
//    <Lauta pollInterval={2000} />,
//    document.getElementById("react")
//);