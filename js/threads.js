var Lauta = React.createClass({
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
            <div className="threadBox">
            <h1>Lauta</h1>
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
        if (this.props.data.answers != undefined) {
            var answers = this.props.data.answers.map(function(answer, index) {
                return (
                    <Answer data={answer} key={answer.id} />
                );
            });

            return (
                <div className="thread">
                    <Answer data={this.props.data} op="true"/>
                    {this.props.data.answerCount - 3} posts skipped
                    {answers}
                </div>
            );
        }
        return (<div key="asd" />);
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