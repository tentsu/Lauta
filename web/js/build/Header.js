/** @jsx React.DOM */

var Header = React.createClass({displayName: 'Header',
    render: function() {
        return (
            React.createElement("header", null, 
                React.createElement("h1", null, React.createElement("a", {href: "/"}, "Lauta"))
            )
        );
    }
});