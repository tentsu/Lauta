console.log("fasfASF");

angular.module("Lauta", ["Derp"]);
angular.module("Derp", []);

angular.module("Derp")
    .controller("MainCtrl", function ($scope, $http) {
    
    console.log("fsafa");
    $scope.threads = [];

    $http.get("threads.json").success( function(data) {
        $scope.threads = data;
        console.log(data);
    });
});
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
//var Lauta = React.createClass({
//  loadThreadsFromServer: function() {
//    $.ajax({
//      url: this.props.url,
//      dataType: 'json',
//      success: function(data) {
//        this.setState({data: data});
//      }.bind(this),
//      error: function(xhr, status, err) {
//        console.error(this.props.url, status, err.toString());
//      }.bind(this)
//    });
//  },
//  getInitialState: function() {
//    return {data: []};
//  },
//  componentDidMount: function() {
//    this.loadThreadsFromServer();
//    setInterval(this.loadThreadsFromServer, this.props.pollInterval);
//  },
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
////React.renderComponent(
////    <Lauta pollInterval={2000} />,
////    document.getElementById("react")
////);
//
//
//app.value("ThreadList", ThreadList);
//
//app.directive('list', function( reactDirective ) {
//  return reactDirective( ThreadList );
//} );
