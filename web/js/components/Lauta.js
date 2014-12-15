 /** @jsx React.DOM */
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
                <NewThreadForm/>
                <ThreadList data={this.props.threads}/>
            </div>
        );
    }
});