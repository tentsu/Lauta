 /** @jsx React.DOM */

var Post = React.createClass({
    getInitialState: function() {
        return {
            full: false
        };
    },
    parseTime: function(time) {
        var hours   = addZero(time.getHours()),
            mins    = addZero(time.getMinutes()),
            secs    = addZero(time.getSeconds()),
            day     = addZero(time.getDate()),
            mm      = addZero(time.getMonth()) + 1; // Correct month
        
        var tm = hours + ":" + mins + ":" + secs;
        var dt = day + "." + mm + "." + time.getFullYear();
        
        return (dt + " " + tm);
        
        function addZero(str) {
            return (str < 10) ? "0" + str : str;
        }
    },
    imageClick: function(event) {
        if (event.button == 1 || event.button == 2) {
            return;
        }
        
        event.preventDefault();
        this.setState({full: !this.state.full});
    },
    deletePost: function() {
        if (this.props.scope.thread == undefined) {
            console.log("jk lol.")
            return;
        }
        
        this.props.scope.deletePost(this.props.scope.thread.id, this.props.data.id);
    },
    postIdClick: function() {
        document.getElementById("postMessage").value += ">>" + this.props.data.id;
    },
    render: function() {
        var data = this.props.data;
//        console.log(this.props)
        
        var time = this.parseTime(new Date(data.time));
        
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
            ?   <div className="threadTitle">
                    <h3><a href={data.id}>{data.title}</a></h3>
                </div>
            : "";
        
        var deleteButton = (this.props.scope.thread != undefined)
            ?   <div className="deletePost" onClick={this.deletePost}>
                    Delete
                </div>
            : "";
        
        var postLink = '#' + data.id;
        
        return (
            <div>
                {titleBar}
                <div className={postStyles} id={data.id}>
                    {deleteButton}
                    <a target="_blank" href={data.img}>
                        <img onClick={this.imageClick} className={imageSize} src={data.img} />
                    </a>
                    <div className="postId">
                        <a href="" onClick={this.postIdClick}> >>{data.id}</a>
                    </div>
                    <div className="author">
                        {data.author}
                    </div>
                    <div className="time">
                        {time}
                    </div>
                    <div className="message">
                        {data.message}
                    </div>
                </div>
            </div>
        );
    }
});