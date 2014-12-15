 /** @jsx React.DOM */

var AnswerThreadForm = React.createClass({
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
            <div className="threadForm answer">
                <form name="answerThreadForm" onSubmit={this.sendForm}>
                    <strong>Answer thread</strong>
                    <textarea ref="message" placeholder="Thread message"></textarea>
                    <input type="file" />
                    <button type="submit">Answer thread</button>
                </form>
            </div>
        );
    }
});