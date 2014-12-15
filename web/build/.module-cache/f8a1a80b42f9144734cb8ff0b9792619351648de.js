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
            React.createElement(Thread, {data: this.props})
            )
        );
    }
});



var NewThread = React.createClass({displayName: 'NewThread',
    createThread: function(e) {
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
                console.log("VISKATTU")
                console.log(data)
                
//                window.location.replace(data);
            }.bind(this),
            error: function(xhr, status, err) {
                console.log("erroria");
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    render: function() {
        return (
            React.createElement("div", {className: "newThread"}, 
                React.createElement("form", {name: "newThread", onSubmit: this.createThread}, 
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


var ThreadList = React.createClass({displayName: 'ThreadList',
    render: function() {
        var threads = this.props.data.threads.map(function(thread, index) {
            return (
                React.createElement(Thread, {data: thread, key: thread.id})
            );
        });
        
        console.log(threads)
        
        return (
            React.createElement("div", {className: "threadList"}, 
                threads
            )
        );
    }
});

var Thread = React.createClass({displayName: 'Thread',
    
    getDefaultProps: function() {
        return {
            answers: []
        };
    },
    render: function() {
        console.log(this.props.data)
        if (this.props.data.answers.length > 0) {
            var answers = this.props.data.answers.map(function(answer, index) {
                return (
                    React.createElement(Answer, {data: answer, key: answer.id})
                );
            });
        } else {
            var answers = "";
        }
            
            console.log(this.props.data)

            return (
                React.createElement("div", {className: "thread"}, 
                    React.createElement(Answer, {data: this.props.data, op: "true"}), 
                    this.props.data.answerCount - 3, " posts skipped", 
                    answers
                )
            );
        
    
        return (React.createElement("div", {key: "asd"}));
    }
});

var Answer = React.createClass({displayName: 'Answer',
    getInitialState: function() {
        return {
            op: false,
            full: false
        };
    },
    imageClick: function(event) {
        console.log("image clicked")

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