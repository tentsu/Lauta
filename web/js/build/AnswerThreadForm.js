 /** @jsx React.DOM */

var AnswerThreadForm = React.createClass({displayName: 'AnswerThreadForm',
    sendForm: function(e) {
        e.preventDefault();
        
        var post = {
            message: this.refs.message.getDOMNode().value.trim()
        };
        
        $.ajax({
            url: "/api/posts/"+this.props.id,
            dataType: 'json',
            type: "PUT",
            data: post,
            success: function(data) {
                window.location.replace("/"+this.props.id);
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    render: function() {
        return (
            React.createElement("div", {className: "threadForm answer"}, 
                React.createElement("form", {name: "answerThreadForm", onSubmit: this.sendForm}, 
                    React.createElement("strong", null, "Answer thread"), 
                    React.createElement("textarea", {ref: "message", placeholder: "Thread message"}), 
                    React.createElement("input", {type: "file"}), 
                    React.createElement("button", {type: "submit"}, "Answer thread")
                )
            )
        );
    }
});