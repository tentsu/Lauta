 /** @jsx React.DOM */

var AnswerThreadForm = React.createClass({displayName: "AnswerThreadForm",
    sendForm: function (e) {
        e.preventDefault();
        e.stopPropagation();
        
        var post = {
            threadId: this.props.id,
            message: this.refs.message.getDOMNode().value.trim(),
            img: document.getElementById("postImage").files[0]
        };
        
        this.props.scope.addAnswer(post, function () {
            document.getElementById("answerThreadForm").reset();
        });
    },
    render: function () {
        return (
            React.createElement("div", {className: "threadForm answer"}, 
                React.createElement("form", {name: "answerThreadForm", id: "answerThreadForm", onSubmit: this.sendForm}, 
                    React.createElement("h2", null, "Answer thread"), 
                    React.createElement("textarea", {ref: "message", placeholder: "Thread message", id: "postMessage"}), 
                    React.createElement("input", {type: "file", name: "displayImage", id: "postImage", accept: "image/*", ref: "image"}), 
                    React.createElement("button", {type: "submit"}, "Answer thread")
                )
            )
        );
    }
});