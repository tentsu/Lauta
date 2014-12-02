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
        console.log("All threads")
        console.log(this.props)
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
        console.log("Opened thread");
        console.log(this.props)
        
        var thread = [{
            op: this.props.op,
            answers: this.props.answers
        }]
        
        console.log("TÄÄÄT")
        console.log(thread)
        return (
            React.createElement("div", {className: "threadBox"}, 
            React.createElement("a", {href: "/"}, React.createElement("h1", null, "Lauta")), 
            React.createElement(Thread, {data: thread})
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
//        console.log(this.props)
        var threads = this.props.data.threads.map(function(thread, index) {
        console.log("TÄÄÄT")
            console.log(thread)
            return (
                React.createElement(Thread, {data: thread})
            );
        });
        
//        console.log(threads)
        
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
            op: {},
            answers: []
        };
    },
    render: function() {
        console.log("this.props")
        console.log(this.props)
        var answers = this.props.answers.map(function(answer, index) {
            return Answer(answer);
        });
//        console.log(this.props)
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