 /** @jsx React.DOM */

var Thread = React.createClass({
    render: function() {
        var props = this.props;
        var skippedAnswers = <div/>;
        
        if (this.props.data.answers == undefined || this.props.data.answers[0] == undefined) {
            this.props.data.answers = [];
        } else {
            skippedAnswers = 
                <div className="meta-data">
                    {this.props.data.answerCount} answers
                </div>;
            
            var answers = this.props.data.answers.map(function(answer, index) {
                return (
                    <Post data={answer} key={answer.id} scope={props.scope} />
                );
            });
        }
        
        return (
            <div className="thread">
                <Post data={this.props.data} scope={this.props.scope} op="true"/>
                {skippedAnswers}
                {answers}
            </div>
        );
    }
});