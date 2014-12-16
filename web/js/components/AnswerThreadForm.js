 /** @jsx React.DOM */

var AnswerThreadForm = React.createClass({
    sendForm: function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        var post = {
            threadId: this.props.id,
            message: this.refs.message.getDOMNode().value.trim(),
            img: document.getElementById("postImage").files[0]
        };
        
        this.props.scope.addAnswer(this.props.id, post);
    },
    render: function() {
        return (
            <div className="threadForm answer">
                <form name="answerThreadForm" onSubmit={this.sendForm}>
                    <strong>Answer thread</strong>
                    <textarea ref="message" placeholder="Thread message"></textarea>
            
                    <input type="file" name="displayImage" id="postImage" accept="image/*" ref="image"/>
                    <button type="submit">Answer thread</button>
                </form>
            </div>
        );
    }
});