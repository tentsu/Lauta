 /** @jsx React.DOM */

window.OpenedThread = React.createClass({displayName: 'OpenedThread',
    render: function() {
//        console.log("Opened thread");
//        console.log(this.props)
        
        return (
            React.createElement("div", null, 
                React.createElement(Header, null), 
            
                React.createElement("div", {className: "threadBox"}, 
                    React.createElement(AnswerThreadForm, {id: this.props.thread.id, scope: this.props.scope}), 
                    React.createElement(Thread, {data: this.props.thread})
                ), 
            
                React.createElement(Footer, null)
            )
        );
    }
});