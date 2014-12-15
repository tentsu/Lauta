 /** @jsx React.DOM */

var NewThreadForm = React.createClass({
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
            <div className="threadForm new">
                <form name="newThread" encType="multipart/form-data" onSubmit={this.sendForm}>
                    <strong>New thread</strong>
                    <input type="text" placeholder="Thread title" ref="title"/>
                    <textarea ref="message" placeholder="Thread message"></textarea>
                    <input type="file" name="displayImage" id="postImage" accept="image/*" ref="image"/>
                    <button type="submit">Create thread</button>
                </form>
            </div>
        );
    }
});