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
                <div className="info">{this.props.threads.length} threads in this board!</div>
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
            <AnswerThreadForm id={this.props.id}/>
            <Thread data={this.props} />
            </div>
        );
    }
});



var NewThread = React.createClass({
    sendForm: function(e, data) {
        e.preventDefault();
        e.stopPropagation(); 
                
        var file = document.getElementById('postImage').files[0];
        
        var data = new FormData();
        data.append("img", file);
        
        var post = {
            title: this.refs.title.getDOMNode().value.trim(),
            message: this.refs.message.getDOMNode().value.trim(),
            img: file
        };
        
        console.log(data)
        
        
        if (post.title == "") {
            post.title = "ASD";
        }
        if (post.message == "") {
            post.message = "DERP";
        }
        
        
        $.ajax({
            url: "/api/posts",
            dataType: 'json',
            type: "POST",
            data: data,
            processData: false,
            contentType: false,
            success: function(data) {
                window.location.replace("/"+data);
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
//        
    },
    render: function() {
        return (
            <div className="threadForm new">
                <form name="newThread" encType="multipart/form-data" onSubmit={this.sendForm}>
                    <strong>New thread</strong>
                    <input type="text" placeholder="Thread title" ref="title"/>
                    <textarea ref="message" placeholder="Thread message"></textarea>
                    <input type="file" name="displayImage" id="postImage" accept="image/*" ref="image"/>
                    <button type="submit">Create thread</button>
                </form>
            </div>
        );
    }
});


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
        var skippedAnswers = <div/>;
        
        if (this.props.data.answers == undefined || this.props.data.answers[0] == undefined) {
            this.props.data.answers = [];
        } else {
            if (this.props.data.answers.length <= 3) {
                skippedAnswers = 
                    <div className="meta-data">
                        {this.props.data.answerCount - 3} posts skipped
                    </div>;
            }
            
            var answers = this.props.data.answers.map(function(answer, index) {
                return (
                    <Post data={answer} key={answer.id} />
                );
            });
        }
        
        return (
            <div className="thread">
                <Post data={this.props.data} op="true"/>
                {skippedAnswers}
                {answers}
            </div>
        );
    }
});

var Post = React.createClass({
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