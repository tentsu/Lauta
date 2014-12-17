 /** @jsx React.DOM */

var Post = React.createClass({
    getInitialState: function() {
        return {
            op: false,
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
                    {time}
                </div>
                <div className="message">
                    {data.message}
                </div>
            </div>
        );
    }
});