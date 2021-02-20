import Moment from 'react-moment';
import React from 'react';
import {ProgressBar, Button, Card, ButtonGroup, Row, Col} from 'react-bootstrap';

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
            progressbar = <ProgressBar variant="warning" animated now={this.state.progress} label={`${this.state.progress}%`} />;
            remainder = <Moment duration={new Date()} date={this.state.end} />;
        }

        return (
        <div>
            <Card className="text-center" border="secondary" >
                <Card.Body>
                    <Row>
                        <Col>Fast Start: <Moment format="dddd, MMMM DD, YYYY @ hh:mm A" date={this.state.start}/></Col>
                        <Col>Fast End: <Moment format="dddd, MMMM DD, YYYY @ hh:mm A" date={this.state.end} /></Col>
                    </Row>
                    <hr></hr>
                    {progressbar}
                    <hr></hr>
                    <Row>
                        <Col className="text-muted">Total duration: <Moment duration={this.state.start} date={this.state.end}/></Col>
                        <Col> 
                            <ButtonGroup>
                                <Button variant="outline-success" onClick={()=> {this.props.history.replace(`/fasts/edit/${this.state.id}`)}}>Edit Fast</Button>
                                <Button variant="outline-danger" onClick={this.deleteFast}>Delete Fast</Button>
                            </ButtonGroup>
                        </Col>
                        <Col className="text-muted">Time left: {remainder}</Col>
                    </Row>
                </Card.Body>
            </Card>
        </div>)
    }
}