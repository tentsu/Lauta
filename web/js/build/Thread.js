 /** @jsx React.DOM */

var Thread = React.createClass({displayName: "Thread",
    render: function() {
        var props = this.props;
        var skippedAnswers = React.createElement("div", null);
        
        if (this.props.data.answers == undefined || this.props.data.answers[0] == undefined) {
            this.props.data.answers = [];
        } else {
            skippedAnswers = 
                React.createElement("div", {className: "meta-data"}, 
                    this.props.data.answerCount, " answers"
                );
            
            var answers = this.props.data.answers.map(function(answer, index) {
                return (
                    React.createElement(Post, {data: answer, key: answer.id, scope: props.scope})
                );
            });
        }
        
        return (
            React.createElement("div", {className: "thread"}, 
                React.createElement(Post, {data: this.props.data, scope: this.props.scope, op: "true"}), 
                skippedAnswers, 
                answers
            )
        );
    }
});