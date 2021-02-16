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
        axios.get('http://localhost:5000/fasts/' + this.props.match.params.id)
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

        console.log(Fast);

        axios.post(`http://localhost:5000/fasts/edit/${this.props.match.params.id}`, Fast)
        .then(res => console.log(res.data));

    }

    render() {
        return (
            <div>
            <h1>Edit Fast!</h1>
            <Form onSubmit={this.handleSubmit}>
                <Form.Group>
                    <div>
                    <Form.Label>Start Date: </Form.Label>
                    <DateTimePicker value={this.state.startdate} onChange={this.handleStartDateChange}/>
                    </div>
                    <div>
                    <Form.Label>End Date: </Form.Label>
                    <DateTimePicker value={this.state.enddate} onChange={this.handleEndDateChange}/>
                    </div>
                </Form.Group>
                <Button variant="primary" type="submit">Submit</Button>
            </Form>
            </div>
        );
    }
}