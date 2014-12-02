  
var Lauta = React.createClass({displayName: 'Lauta',
//    componentWillMount: function(){
//        console.log(this.props)
//       var scope = this.props.scope;
//           scope.Lauta.react = this;
//    },
    getDefaultProps: function() {
        return {
          name: 'default value',
            age: "sad"
        };
    },
    propTypes: {
        name : React.PropTypes.string.isRequired,
        age : React.PropTypes.string.isRequired
    },
    render: function() {
        console.log(this.props)
        return (
            React.createElement("div", {className: "threadBox"}, 
            React.createElement("h1", null, "Lauta"), 
            React.createElement(ThreadList, {data: this.props.name})
            )
        );
    }
});


var ThreadList = React.createClass({displayName: 'ThreadList',
    render: function() {
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
        return (
            React.createElement("div", {className: "thread"}, 
                React.createElement("img", {src: this.props.img}), 
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