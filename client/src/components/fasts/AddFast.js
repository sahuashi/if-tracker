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
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleDurationButtonClick = (event, data) => {
    // console.log(this.state);
    const tmp = new Date(this.state.startdate);
    const hours = data.value;
    const newEndDate = new Date(tmp.setHours(tmp.getHours() + hours));
    this.setState({ enddate: newEndDate });
  }

  handleSubmit(event) {
    event.preventDefault();

    const Fast = {
      startTime: this.state.startdate,
      endTime: this.state.enddate,
      user: this.props.user.id,
    };

    axios.post('http://localhost:5000/fasts/add', Fast)
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
            <DateTimePicker
              value={new Date(this.state.startdate)}
              onChange={(date) => {
                this.setState({ startdate: date });
                this.value = this.state.startdate;
              }}
            />
          </Form.Field>
          <Button.Group>
            <Button value={8} type="button" onClick={this.handleDurationButtonClick}>8 hrs</Button>
            <Button.Or />
            <Button value={12} type="button" onClick={this.handleDurationButtonClick}>12 hrs</Button>
            <Button.Or />
            <Button value={16} type="button" onClick={this.handleDurationButtonClick}>16 hrs</Button>
          </Button.Group>
          <Form.Field style={{ marginBottom: '10px' }}>
            <label>Fast End: </label>
            <DateTimePicker
              value={new Date(this.state.enddate)}
              onChange={(date) => {
                this.setState({ enddate: date });
                this.value = this.state.enddate;
              }}
            />
          </Form.Field>
          <Button color="olive" type="submit">Add Fast</Button>
        </form>
      </div>
    );
  }
}
