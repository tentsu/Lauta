 /** @jsx React.DOM */

window.OpenedThread = React.createClass({
    render: function() {
//        console.log("Opened thread");
//        console.log(this.props)
        
        return (
            <div>
                <Header />
            
                <div className="threadBox">
                    <AnswerThreadForm id={this.props.thread.id} scope={this.props.scope}/>
                    <Thread data={this.props.thread} />
                </div>
            
                <Footer />
            </div>
        );
    }
});