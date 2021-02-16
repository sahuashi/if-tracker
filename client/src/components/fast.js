import Moment from 'react-moment';
import React from 'react';
import {ProgressBar} from 'react-bootstrap';

export default class Fast extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            start: new Date(this.props.start), 
            end: new Date(this.props.end), 
            difference: 0,
            elapsed: 0,
            progress: 0
        };
        this.getDifference = this.getDifference.bind(this);
        this.getElapsed = this.getElapsed.bind(this);
        this.getProgress = this.getProgress.bind(this);
    }

    componentDidMount(){
        this.getDifference();
        this.getElapsed();
    }

    getDifference(){
        var diffInSeconds = (this.state.end - this.state.start)/1000;
        this.setState({ difference: diffInSeconds });
    }

    getElapsed(){
        var elapsed = ((new Date())- this.state.start)/1000;
        this.setState({ elapsed: elapsed }, ()=>{
            (this.getProgress())
        });
    }

    getProgress(){
        var progress = (this.state.elapsed/this.state.difference)*100;
        progress > 100? progress = 100 : progress = Math.round(progress);
        this.setState({ progress: progress });
    }

    render() {
        var progressbar;
        this.state.progress === 100 ?
        progressbar = <ProgressBar variant="success" striped now={100} label={'100%'}/> :
        progressbar = <ProgressBar variant="info" animated now={this.state.progress} label={`${this.state.progress}%`} />

        return (
        <div>
            Start: <Moment format="dddd, MMMM DD, YYYY @ hh:mm A" date={this.state.start}/>
            <br/>
            End: <Moment format="dddd, MMMM DD, YYYY @ hh:mm A" date={this.state.end} />
            <br/>
            Duration: <Moment duration={this.state.start} date={this.state.end}/>
            <br/>
            Difference: {this.state.difference}
            <br/>
            Time since: <Moment date={this.state.start} durationFromNow/>
            <br/>
            Progress (%): {this.state.progress}
            {progressbar}
        </div>)
    }
}