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
        console.log("fafas");
    },
    componentWillMount: function(){
        console.log(this.props);
       var scope = this.props.scope;
    },
    render: function() {
        return (
            React.createElement("div", {className: "newThread"}, 
                React.createElement("form", {name: "newThread", onSubmit: this.createThread}, 
                    React.createElement("strong", null, "New thread"), 
                    React.createElement("input", {type: "text", placeholder: "Thread title", name: "title", id: "newThreadTitle"}), 
                    React.createElement("textarea", {id: "newThreadMessage", placeholder: "Thread message"}), 
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
        
        return (
            React.createElement("div", {className: "threadList"}, 
                threads
            )
        );
    }
});

var Thread = React.createClass({displayName: 'Thread',
    render: function() {
        if (this.props.data.answers != undefined) {
            var answers = this.props.data.answers.map(function(answer, index) {
                return (
                    React.createElement(Answer, {data: answer, key: answer.id})
                );
            });

            return (
                React.createElement("div", {className: "thread"}, 
                    React.createElement(Answer, {data: this.props.data, op: "true"}), 
                    this.props.data.answerCount - 3, " posts skipped", 
                    answers
                )
            );
        }
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