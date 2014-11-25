var Hello = React.createClass({
  render: function() {
    return React.DOM.div({}, 'Hello ' + this.props.name);
  }
});