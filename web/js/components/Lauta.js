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
            <div>
                <Header />

                <div className="threadBox">
                    <NewThreadForm scope={this.props.scope}/>
                    
                    <h2>Threads</h2>
                    <div className="info">{this.props.threads.length} threads in this board</div>
                    <ThreadList data={this.props.threads}/>
                </div>
            
                <Footer />
            </div>
        );
    }
});