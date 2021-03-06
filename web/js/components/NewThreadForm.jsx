 /** @jsx React.DOM */

var NewThreadForm = React.createClass({
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
            <div className="threadForm new">
                <form name="newThread" encType="multipart/form-data" onSubmit={this.sendForm}>
                    <h3>New thread</h3>
                    <input type="text" placeholder="Thread title" ref="title"/>
                    <textarea ref="message" placeholder="Thread message"></textarea>
                    
                    <input type="file" name="displayImage" id="postImage" accept="image/*" ref="image"/>
                    <button type="submit">Create thread</button>
                </form>
            </div>
        );
    }
});

