 /** @jsx React.DOM */

var ThreadList = React.createClass({displayName: 'ThreadList',
    render: function() {
        if (this.props.data.length == undefined) {
            return (React.createElement("div", null));
        }

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