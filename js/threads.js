var Lauta = React.createClass({
    getDefaultProps: function() {
        return {
            threads: []
        };
    },
    render: function() {
//        console.log("All threads")
//        console.log(this.props)
        return (
            <div className="threadBox">
                <h1>Lauta</h1>
                <NewThread/>
                <ThreadList data={this.props}/>
            </div>
        );
    }
});

var Opened = React.createClass({
    render: function() {
//        console.log("Opened thread");
//        console.log(this.props)
        
        return (
            <div className="threadBox">
            <a href="/"><h1>Lauta</h1></a>
            <Thread data={this.props} />
            </div>
        );
    }
});



var NewThread = React.createClass({
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
                window.location.replace("/"+data);
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    render: function() {
        return (
            <div className="newThread">
                <form name="newThread" onSubmit={this.createThread}>
                    <strong>New thread</strong>
                    <input type="text" placeholder="Thread title" ref="title"/>
                    <textarea ref="message" placeholder="Thread message"></textarea>
                    <input type="file" />
                    <button type="submit">Create thread</button>
                </form>
            </div>
        );
    }
});


var ThreadList = React.createClass({
    render: function() {
        var threads = this.props.data.threads.map(function(thread, index) {
            return (
                <Thread data={thread} key={thread.id} />
            );
        });
        
        return (
            <div className="threadList">
                {threads}
            </div>
        );
    }
});

var Thread = React.createClass({
    render: function() {
        var skippedAnswers = 0;
        
        if (this.props.data.answers == undefined || this.props.data.answers[0] == undefined) {
            this.props.data.answers = [];
        } else {
            skippedAnswers = this.props.data.answerCount - 3;
            
            var answers = this.props.data.answers.map(function(answer, index) {
                return (
                    <Answer data={answer} key={answer.id} />
                );
            });
        }
        
        return (
            <div className="thread">
                <Answer data={this.props.data} op="true"/>
                <div className="meta-data">{skippedAnswers} posts skipped</div>
                {answers}
            </div>
        );
    }
});

var Answer = React.createClass({
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
            ?   <div className="title">
                    <a href={data.id}>{data.title}</a>
                </div>
            : "";
        
        return (
            <div className={postStyles}>
                {titleBar}
                <a target="_blank" href={data.img}>
                    <img onClick={this.imageClick} className={imageSize} src={data.img} />
                </a>
                <div className="author">
                    {data.author}
                </div>
                <div className="time">
                    {data.time}
                </div>
                <div className="message">
                    {data.message}
                </div>
            </div>
        );
    }
});