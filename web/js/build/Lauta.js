 /** @jsx React.DOM */

var Lauta = React.createClass({displayName: 'Lauta',
    getDefaultProps: function() {
        return {
            threads: []
        };
    },
    render: function() {
//        console.log("All threads")
//        console.log(this.props)
        
        return (
            React.createElement("div", null, 
                React.createElement(Header, null), 

                React.createElement("div", {className: "threadBox"}, 
                    React.createElement(NewThreadForm, {scope: this.props.scope}), 
                    
                    React.createElement("h2", null, "Threads"), 
                    React.createElement("div", {className: "info"}, this.props.threads.length, " threads in this board"), 
                    React.createElement(ThreadList, {data: this.props.threads})
                ), 
            
                React.createElement(Footer, null)
            )
        );
    }
});