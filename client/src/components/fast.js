import Moment from 'react-moment';
import React from 'react';
import {ProgressBar, Button, Card} from 'react-bootstrap';

export default class Fast extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            id: this.props.id,
            start: new Date(this.props.start), 
            end: new Date(this.props.end), 
            difference: 0,
            elapsed: 0,
            progress: 0
        };
        this.getDifference = this.getDifference.bind(this);
        this.getElapsed = this.getElapsed.bind(this);
        this.getProgress = this.getProgress.bind(this);
        this.deleteFast = this.deleteFast.bind(this);
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

    deleteFast() {
        this.props.deleteFast(this.state.id);
    }

    render() {
        var progressbar, remainder;
        if(this.state.progress === 100){
            progressbar = <ProgressBar variant="success" striped now={100} label={'100%'} />;
            remainder = 0;
        }
        else{
            progressbar = <ProgressBar variant="info" animated now={this.state.progress} label={`${this.state.progress}%`} />;
            remainder = <Moment duration={new Date()} date={this.state.end} />;
        }

        return (
        <div>
            <Card>
            Start: <Moment format="dddd, MMMM DD, YYYY @ hh:mm A" date={this.state.start}/>
            <br/>
            End: <Moment format="dddd, MMMM DD, YYYY @ hh:mm A" date={this.state.end} />
            <br/>
            Duration: <Moment duration={this.state.start} date={this.state.end}/>
            <br/>
            Time left: {remainder}
            <br/>
            {progressbar}
            <Button variant="outline-danger" onClick={this.deleteFast}>Delete Fast</Button>
            <Button variant="outline-success" onClick={()=> {this.props.history.replace(`/fasts/edit/${this.state.id}`)}}>Edit Fast</Button>
            </Card>
        </div>)
    }
}