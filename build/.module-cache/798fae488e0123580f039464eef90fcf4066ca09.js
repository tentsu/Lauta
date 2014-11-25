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
  render: function() {
    return (
      React.createElement("div", {className: "threadBox"}, 
        React.createElement("h1", null, "Lauta"), 
        React.createElement(ThreadList, {data: this.state.data})
      )
    );
  }
});


React.renderComponent(
    React.createElement(Lauta, {url: "threads.json", pollInterval: 2000}),
    document.getElementById("react")
);