angular.module("Lauta", ["Main", "react"]);
angular.module("Main", []);

angular.module("Main")
    .controller("MainCtrl", MainCtrl);

function MainCtrl ($scope, $http) {
    console.log("fsafa");
    $scope.threads = [];

    $http.get("threads.json").success( function(data) {
        $scope.threads = data;
        console.log(data);
    });
}
        
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
        

var Lauta = React.createClass({displayName: 'Lauta',
  loadThreadsFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadThreadsFromServer();
    setInterval(this.loadThreadsFromServer, this.props.pollInterval);
  },
    
    componentWillMount: function(){
       var scope = this.props.scope;
        console.log(scope)
//           scope.Lauta. = this;
    },
  render: function() {
    return (
      React.createElement("div", {className: "threadBox"}, 
        React.createElement("h1", null, "Lauta"), 
        React.createElement(ThreadList, {data: this.scope})
      )
    );
  }
});


//React.renderComponent(
//    <Lauta pollInterval={2000} />,
//    document.getElementById("react")
//);


app.value("ThreadList", ThreadList);

app.directive('threadList', function( reactDirective ) {
  return reactDirective( ThreadList );
} );
