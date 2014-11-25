var Hello = React.createClass({displayName: 'Hello',
  render: function() {
    return React.DOM.div({}, 'Hello ' + this.props.name);
  }
});

React.render(
  React.createElement("h1", null, "Hello, world!"),
  document.getElementById('example')
);