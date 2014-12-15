var NewThreadForm = React.createClass({displayName: 'NewThreadForm',
    sendForm: function(e, data) {
        e.preventDefault();
        e.stopPropagation(); 
                
//        var file = document.getElementById('postImage').files[0];
//        
//        var data = new FormData();
//        data.append("img", file);
        
        var post = {
            title: this.refs.title.getDOMNode().value.trim(),
            message: this.refs.message.getDOMNode().value.trim()
//            img: file
        };
        
        if (post.title == "") {
            post.title = "ASD";
        }
        if (post.message == "") {
            post.message = "DERP";
        }
        
        
        $.ajax({
            url: "/api/posts",
            dataType: 'json',
            type: "POST",
            data: post,
            success: function(data) {
                window.location.replace("/"+data);
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
//        
    },
    render: function() {
        return (
            React.createElement("div", {className: "threadForm new"}, 
                React.createElement("form", {name: "newThread", encType: "multipart/form-data", onSubmit: this.sendForm}, 
                    React.createElement("strong", null, "New thread"), 
                    React.createElement("input", {type: "text", placeholder: "Thread title", ref: "title"}), 
                    React.createElement("textarea", {ref: "message", placeholder: "Thread message"}), 
                    React.createElement("input", {type: "file", name: "displayImage", id: "postImage", accept: "image/*", ref: "image"}), 
                    React.createElement("button", {type: "submit"}, "Create thread")
                )
            )
        );
    }
});