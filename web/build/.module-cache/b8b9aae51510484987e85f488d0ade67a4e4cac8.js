var Lauta = React.createClass({displayName: 'Lauta',
    getDefaultProps: function() {
        return {
            threads: []
        };
    },
//    propTypes: {
//        threads : React.PropTypes.array.isRequired,
//    },
    render: function() {
//        console.log("All threads")
//        console.log(this.props)
        return (
            React.createElement("div", {className: "threadBox"}, 
            React.createElement("h1", null, "Lauta"), 
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



var ThreadList = React.createClass({displayName: 'ThreadList',
    getDefaultProps: function() {
        return {
            threads: []
        };
    },
    render: function() {
        var threads = this.props.data.threads.map(function(thread, index) {
            return (
                React.createElement(Thread, {data: thread})
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
    getDefaultProps: function() {
        return {
            data: {
                op: {},
                answers: [],
                answerCount: 0
            }
        };
    },
    propTypes: {
        data: {
            op: React.PropTypes.object.isRequired,
            answers: React.PropTypes.array.isRequired,
            answerCount: React.PropTypes.number.isRequired
        }
    },
    render: function() {
        console.log(this.props)
//        if (this.props.data.answers != undefined) {
            var answers = this.props.data.answers.map(function(answer, index) {
                return (
                    React.createElement(Answer, {data: answer, key: answer.id})
                );
            });
        

            return (
                React.createElement("div", {className: "thread", key: this.props.data.op.id}, 
                    React.createElement(Answer, {data: this.props.data.op}), 
                    this.props.data.answerCount - 3, " posts skipped", 
                    answers
                )
            );
//        }
//        return ();
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
        
        var postStyles = (data.op) ? cx({
            'post': true,
            'op': true,
            'answer': false
        }) : cx({
            'post': true,
            'op': false,
            'answer': true
        });
        
        var titleBar = (data.op)
            ?   React.createElement("div", {className: "title"}, 
                    React.createElement("a", {href: data.id}, "DMASFMKSAFJKASJFKAJF")
                )
            : "";
        
        return (
            React.createElement("div", {className: postStyles, key: data.id}, 
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