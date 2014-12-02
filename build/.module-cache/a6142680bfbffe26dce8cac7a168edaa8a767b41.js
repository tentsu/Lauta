var Lauta = React.createClass({displayName: 'Lauta',
    getDefaultProps: function() {
        return {
            threads: []
        };
    },
    propTypes: {
        threads : React.PropTypes.array.isRequired,
    },
    render: function() {
        return (
            React.createElement("div", {className: "threadBox"}, 
            React.createElement("h1", null, "Lauta"), 
            React.createElement(ThreadList, {data: this.props.threads})
            )
        );
    }
});

var OpenedThread = React.createClass({displayName: 'OpenedThread',
    getDefaultProps: function() {
        return {
            posts: []
        };
    },
    propTypes: {
        posts : React.PropTypes.array.isRequired,
    },
    render: function() {
        return (
            React.createElement("div", {className: "threadBox"}, 
            React.createElement("h1", null, "Lauta"), 
            React.createElement(Thread, {data: this.props.posts})
            )
        );
    }
});


var ThreadList = React.createClass({displayName: 'ThreadList',
    render: function() {
        var threads = this.props.data.map(function(thread, index) {
            return Thread(thread);
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
        var answers = this.props.answers.map(function(answer, index) {
            return Answer(answer);
        });
        console.log(this.props)
        return (
            React.createElement("div", {className: "thread"}, 
                Answer(this.props.op), 
                this.props.answerCount - 3, " posts skipped", 
                answers
            )
        );
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
        var cx = React.addons.classSet;
        var imageSize = cx({
            'full': this.state.full
        });
        
        var postStyles = (this.props.op) ? cx({
            'post': true,
            'op': true,
            'answer': false
        }) : cx({
            'post': true,
            'op': false,
            'answer': true
        });
        
        var titleBar = (this.props.op)
            ?   React.createElement("div", {className: "title"}, 
                    React.createElement("a", {href: this.props.id}, "DMASFMKSAFJKASJFKAJF")
                )
            : "";
        
        return (
            React.createElement("div", {className: postStyles}, 
                titleBar, 
                React.createElement("a", {target: "_blank", href: this.props.img}, 
                    React.createElement("img", {onClick: this.imageClick, className: imageSize, src: this.props.img})
                ), 
                React.createElement("div", {className: "author"}, 
                    this.props.author
                ), 
                React.createElement("div", {className: "time"}, 
                    this.props.time
                ), 
                React.createElement("div", {className: "message"}, 
                    this.props.message
                )
            )
        );
    }
});