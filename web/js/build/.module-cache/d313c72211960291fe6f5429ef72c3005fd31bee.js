 /** @jsx React.DOM */

var Lauta2 = React.createClass({displayName: 'Lauta2',
    getDefaultProps: function() {
        return {
            threads: []
        };
    },
    render: function() {
//        console.log("All threads")
//        console.log(this.props)
        return (
            React.createElement("div", {className: "threadBox"}, 
                React.createElement("h1", null, "Lauta"), 
                React.createElement("div", {className: "info"}, this.props.threads.length, " threads in this board!"), 
                React.createElement(NewThreadForm, null), 
                React.createElement(ThreadList, {data: this.props})
            )
        );
    }
});


module.exports = Lauta;