import Moment from 'react-moment';
import React from 'react'

export default class Fast extends React.Component{
    /* constructor(props){
        super(props);
        this.state = {start: this.props.start, end: this.props.end}
    } */

    render() {
        return (
        <div>
            Fast: from {this.props.start} to {this.props.end}!
            <br/>
            Duration: <Moment duration={this.props.start} date={this.props.end}/>
        </div>)
    }
}