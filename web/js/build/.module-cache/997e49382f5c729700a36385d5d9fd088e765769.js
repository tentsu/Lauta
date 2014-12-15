 /** @jsx React.DOM */

var ThreadList = React.createClass({displayName: 'ThreadList',
    render: function() {
        console.log(this.props.data)
        var threads = this.props.data.map(function(thread, index) {
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