var Thread = React.createClass({displayName: 'Thread',
    render: function() {
        return (
            React.createElement("h1", null, "Hello World!")
        );
    }
});

React.renderComponent(
    React.createElement(Hello, null),
    document.getElementById("react")
);