import Moment from 'react-moment';
import React from 'react'

export default class Fast extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            start: new Date(this.props.start), 
            end: new Date(this.props.end), 
            difference: 0
        };
        this.getDifference = this.getDifference.bind(this);
    }

    componentDidMount(){
        this.getDifference();
    }

    getDifference(){
        var diffInSeconds = 0;
        diffInSeconds = (this.state.end - this.state.start)/1000;
        console.log(diffInSeconds);
        this.setState({ difference: diffInSeconds}, () => {
            (console.log(this.state))
        });
    }

    render() {
        return (
        <div>
            Fast: from {this.props.start} to {this.props.end}!
            <br/>
            Duration: <Moment duration={this.props.start} date={this.props.end}/>
            <br/>
            Difference: {this.state.difference}
        </div>)
    }
}