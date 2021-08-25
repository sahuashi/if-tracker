import React from 'react';

import axios from 'axios';
import DateTimePicker from 'react-datetime-picker';
import { Button, Form } from 'semantic-ui-react';

export default class AddFast extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startdate: new Date(),
      enddate: new Date(),
    };
    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
      user: this.props.user.id,
    };

    axios.post('/fasts/add', Fast)
      .then((res) => { this.props.history.replace('/'); });
  }

  render() {
    return (
      <div style={{
        display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '85%',
      }}
      >
        <h1>Add Fast</h1>
        <form onSubmit={this.handleSubmit}>
          <Form.Field style={{ marginBottom: '10px' }}>
            <label>Fast Start: </label>
            <DateTimePicker value={this.state.startdate} onChange={this.handleStartDateChange} />
          </Form.Field>
          <Form.Field style={{ marginBottom: '10px' }}>
            <label>Fast End: </label>
            <DateTimePicker value={this.state.enddate} onChange={this.handleEndDateChange} />
          </Form.Field>
          <Button color="olive" type="submit">Add Fast</Button>
        </form>
      </div>
    );
  }
}
