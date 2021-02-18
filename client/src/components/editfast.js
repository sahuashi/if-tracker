import React from 'react';
import { Form, Button } from 'react-bootstrap';
import DateTimePicker from 'react-datetime-picker'
import axios from 'axios';

export default class EditFast extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props);
        this.state = {
            startdate: new Date(), 
            enddate: new Date()
        };
        this.handleStartDateChange = this.handleStartDateChange.bind(this);
        this.handleEndDateChange = this.handleEndDateChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        axios.get(`http://localhost:5000/fasts/${this.props.match.params.id}`)
        .then(res => {
            console.log(res.data);
            this.setState({startdate: new Date(res.data.startTime), enddate: new Date(res.data.endTime)});
        })
        .catch(err => console.log(err));
    }

    handleStartDateChange(date) {
        this.setState({ startdate: date });
    }

    handleEndDateChange(date) {
        this.setState({ enddate: date });
    }

    handleSubmit(event) {
        event.preventDefault();

        const Fast = {
            startTime: this.state.startdate,
            endTime: this.state.enddate,
            user: this.props.user.id
        };

        axios.post(`http://localhost:5000/fasts/edit/${this.props.match.params.id}`, Fast)
        .then(this.props.history.replace("/fasts/"));

    }

    render() {
        return (
            <div className="text-center">
                <h1 className="mt-3 mb-3">Edit Fast</h1>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group>
                        <Form.Label className="mx-2">Fast Start: </Form.Label>
                        <DateTimePicker value={this.state.startdate} onChange={this.handleStartDateChange}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className="mx-2">Fast End: </Form.Label>
                        <DateTimePicker value={this.state.enddate} onChange={this.handleEndDateChange}/>
                    </Form.Group>
                    <Button variant="info" type="submit">Submit</Button>
                </Form>
            </div>
        );
    }
}