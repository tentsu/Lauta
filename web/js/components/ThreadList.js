 /** @jsx React.DOM */

var ThreadList = React.createClass({
    render: function() {
        var props = this.props;
        
        if (this.props.data.length == undefined) {
            return (<div/>);
        }

        var threads = this.props.data.map(function(thread, index) {
            return (
                <Thread data={thread} key={thread.id} scope={props.scope} />
            );
        });
            
        return (
            <div className="threadList">
                {threads}
            </div>
        );
    }
});