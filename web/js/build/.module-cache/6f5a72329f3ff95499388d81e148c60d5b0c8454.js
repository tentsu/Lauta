 /** @jsx React.DOM */

var ThreadList = React.createClass({displayName: 'ThreadList',
    render: function() {
        var threads = this.props.data.threads.map(function(thread, index) {
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

module.exports = ThreadList;