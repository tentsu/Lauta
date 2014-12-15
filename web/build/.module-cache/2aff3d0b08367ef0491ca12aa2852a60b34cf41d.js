var Lauta = React.createClass({displayName: 'Lauta',
    getDefaultProps: function() {
        return {
            threads: []
        };
    },
    render: function() {
//        console.log("All threads")
//        console.log(this.props)
        return (
            React.createElement("div", {className: "threadBox"}, 
                React.createElement("h1", null, "Lauta"), 
                React.createElement("div", {className: "info"}, this.props.threads.length, " threads in this board!"), 
                React.createElement(NewThread, null), 
                React.createElement(ThreadList, {data: this.props})
            )
        );
    }
});

var Opened = React.createClass({displayName: 'Opened',
    render: function() {
//        console.log("Opened thread");
//        console.log(this.props)
        
        return (
            React.createElement("div", {className: "threadBox"}, 
            React.createElement("a", {href: "/"}, React.createElement("h1", null, "Lauta")), 
            React.createElement(AnswerThreadForm, null), 
            React.createElement(Thread, {data: this.props})
            )
        );
    }
});



var NewThread = React.createClass({displayName: 'NewThread',
    sendForm: function(e) {
        e.preventDefault();
        
        var post = {
            title: this.refs.title.getDOMNode().value.trim(),
            message: this.refs.message.getDOMNode().value.trim()
        };
        
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
    },
    render: function() {
        return (
            React.createElement("div", {className: "threadForm new"}, 
                React.createElement("form", {name: "newThread", onSubmit: this.sendForm}, 
                    React.createElement("strong", null, "New thread"), 
                    React.createElement("input", {type: "text", placeholder: "Thread title", ref: "title"}), 
                    React.createElement("textarea", {ref: "message", placeholder: "Thread message"}), 
                    React.createElement("input", {type: "file"}), 
                    React.createElement("button", {type: "submit"}, "Create thread")
                )
            )
        );
    }
});


var AnswerThreadForm = React.createClass({displayName: 'AnswerThreadForm',
    sendForm: function(e) {
        e.preventDefault();
        
        var post = {
            message: this.refs.message.getDOMNode().value.trim()
        };
        
//        $.ajax({
//            url: "/api/posts/"+,
//            dataType: 'json',
//            type: "POST",
//            data: post,
//            success: function(data) {
//                window.location.replace("/"+data);
//            }.bind(this),
//            error: function(xhr, status, err) {
//                console.error(this.props.url, status, err.toString());
//            }.bind(this)
//        });
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


var ThreadList = React.createClass({displayName: 'ThreadList',
    render: function() {
        var threads = this.props.data.threads.map(function(thread, index) {
            return (
                React.createElement(Thread, {data: thread, key: thread.id})
            );
        });
        
        return (
            React.createElement("div", {className: "threadList"}, 
                threads
            )
        );
    }
});

var Thread = React.createClass({displayName: 'Thread',
    render: function() {
        var skippedAnswers = 0;
        
        if (this.props.data.answers == undefined || this.props.data.answers[0] == undefined) {
            this.props.data.answers = [];
        } else {
            skippedAnswers = this.props.data.answerCount - 3;
            
            var answers = this.props.data.answers.map(function(answer, index) {
                return (
                    React.createElement(Post, {data: answer, key: answer.id})
                );
            });
        }
        
        return (
            React.createElement("div", {className: "thread"}, 
                React.createElement(Post, {data: this.props.data, op: "true"}), 
                React.createElement("div", {className: "meta-data"}, skippedAnswers, " posts skipped"), 
                answers
            )
        );
    }
});

var Post = React.createClass({displayName: 'Post',
    getInitialState: function() {
        return {
            op: false,
            full: false
        };
    },
    imageClick: function(event) {
        if (event.button == 1 || event.button == 2) {
            return;
        }
        
        event.preventDefault();
        this.setState({full: !this.state.full});
    },
    render: function() {
        var data = this.props.data;
//        console.log(this.props)
        
        var cx = React.addons.classSet;
        var imageSize = cx({
            'full': this.state.full
        });
        
        var postStyles = cx({
            'post': true,
            'op': this.props.op,
            'answer': !this.props.op
        });
        
        var titleBar = (this.props.op)
            ?   React.createElement("div", {className: "title"}, 
                    React.createElement("a", {href: data.id}, data.title)
                )
            : "";
        
        return (
            React.createElement("div", {className: postStyles}, 
                titleBar, 
                React.createElement("a", {target: "_blank", href: data.img}, 
                    React.createElement("img", {onClick: this.imageClick, className: imageSize, src: data.img})
                ), 
                React.createElement("div", {className: "author"}, 
                    data.author
                ), 
                React.createElement("div", {className: "time"}, 
                    data.time
                ), 
                React.createElement("div", {className: "message"}, 
                    data.message
                )
            )
        );
    }
});