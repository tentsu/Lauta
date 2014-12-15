 /** @jsx React.DOM */

var ThreadList = React.createClass({displayName: 'ThreadList',
    render: function() {
        console.log(this.props.data.threads.threads)
        var threads = this.props.data.threads.threads.map(function(thread, index) {
            return (
                React.createElement(Thread, {data: thread, key: thread.id})
            );
        });
        
        return (
            React.createElement("div", {className: "threadList"}, 
                threads
            )
        );
    }
});