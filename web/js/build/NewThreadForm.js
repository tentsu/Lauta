 /** @jsx React.DOM */

var NewThreadForm = React.createClass({displayName: 'NewThreadForm',
    sendForm: function(e, data) {
        e.preventDefault();
        e.stopPropagation();
        
        var post = {
            title: this.refs.title.getDOMNode().value.trim(),
            message: this.refs.message.getDOMNode().value.trim(),
            img: document.getElementById("postImage").files[0]
        };
        
        this.props.scope.addThread(post);
    },
    render: function() {
        return (
            React.createElement("div", {className: "threadForm new"}, 
                React.createElement("form", {name: "newThread", encType: "multipart/form-data", onSubmit: this.sendForm}, 
                    React.createElement("h2", null, "New thread"), 
                    React.createElement("input", {type: "text", placeholder: "Thread title", ref: "title"}), 
                    React.createElement("textarea", {ref: "message", placeholder: "Thread message"}), 
                    
                    React.createElement("input", {type: "file", name: "displayImage", id: "postImage", accept: "image/*", ref: "image"}), 
                    React.createElement("button", {type: "submit"}, "Create thread")
                )
            )
        );
    }
});

