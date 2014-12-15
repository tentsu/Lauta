 /** @jsx React.DOM */

window.OpenedThread = React.createClass({
    render: function() {
//        console.log("Opened thread");
//        console.log(this.props)
        
        return (
            <div className="threadBox">
                <a href="/"><h1>Lauta</h1></a>
                <AnswerThreadForm id={this.props.id}/>
                <Thread data={this.props.thread} />
            </div>
        );
    }
});