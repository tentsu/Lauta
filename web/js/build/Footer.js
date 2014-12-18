/** @jsx React.DOM */

var Footer = React.createClass({displayName: 'Footer',
    render: function() {
        return (
            React.createElement("footer", null, 
                "Lauta by ", React.createElement("a", {href: "https://github.com/tentsu/Lauta", target: "_blank"}, "Tentsu @ GitHub")
            )
        );
    }
});