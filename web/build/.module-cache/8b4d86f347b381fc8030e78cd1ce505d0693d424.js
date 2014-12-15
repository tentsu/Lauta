var Hello = React.createClass({displayName: 'Hello',
  render: function() {
    return React.DOM.div({}, 'Hello ' + this.props.name);
  }
});