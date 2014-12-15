 /** @jsx React.DOM */

window.OpenedThread = React.createClass({displayName: 'OpenedThread',
    render: function() {
//        console.log("Opened thread");
        console.log(this.props)
        
        return (
            React.createElement("div", {className: "threadBox"}, 
                React.createElement("a", {href: "/"}, React.createElement("h1", null, "Lauta")), 
                React.createElement(AnswerThreadForm, {id: this.props.id}), 
                React.createElement(Thread, {data: this.props})
            )
        );
    }
});