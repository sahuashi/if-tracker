import React from 'react';
import { Button, Form } from 'semantic-ui-react'
import DateTimePicker from 'react-datetime-picker'
import axios from 'axios';

export default class EditFast extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startdate: new Date(),
            enddate: new Date()
        };
        this.handleStartDateChange = this.handleStartDateChange.bind(this);
        this.handleEndDateChange = this.handleEndDateChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        axios.get(`/fasts/${this.props.match.params.id}`)
            .then(res => {
                this.setState({ startdate: new Date(res.data.startTime), enddate: new Date(res.data.endTime) });
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

        axios.post(`/fasts/edit/${this.props.match.params.id}`, Fast)
            .then(this.props.history.replace("/"));

    }

    render() {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '85%' }}>
                <h1>Edit Fast</h1>
                <form onSubmit={this.handleSubmit}>
                    <Form.Field style={{ marginBottom: '10px' }}>
                        <label>Fast Start: </label>
                        <DateTimePicker value={this.state.startdate} onChange={this.handleStartDateChange} />
                    </Form.Field>
                    <Form.Field style={{ marginBottom: '10px' }}>
                        <label>Fast End: </label>
                        <DateTimePicker value={this.state.enddate} onChange={this.handleEndDateChange} />
                    </Form.Field>
                    <Button style={{ backgroundColor: '#DDA15E', color: 'white' }} type="submit">Confirm</Button>
                </form>
            </div>
        );
    }
}