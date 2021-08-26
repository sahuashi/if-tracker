import React from 'react';

import axios from 'axios';
import DateTimePicker from 'react-datetime-picker';
import { Button, Form, Label } from 'semantic-ui-react';

export default class EditFast extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startdate: new Date(),
      enddate: new Date(),
    };
  }

  componentDidMount() {
    axios.get(`/fasts/${this.props.match.params.id}`)
      .then((res) => {
        this.setState({
          startdate: new Date(res.data.startTime),
          enddate: new Date(res.data.endTime),
        });
      })
      .catch((err) => console.log(err));
  }

  handleDurationButtonClick = (event, data) => {
    const tmp = new Date(this.state.startdate);
    const hours = data.value;
    const newEndDate = new Date(tmp.setHours(tmp.getHours() + hours));
    this.setState({ enddate: newEndDate });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const Fast = {
      startTime: this.state.startdate,
      endTime: this.state.enddate,
      user: this.props.user.id,
    };

    axios.post(`/fasts/edit/${this.props.match.params.id}`, Fast)
      .then(this.props.history.replace('/'));
  }

  render() {
    return (
      <div style={{
        display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '85%',
      }}
      >
        <h1>Edit Fast</h1>
        <form onSubmit={this.handleSubmit}>
          <Form.Field style={{ padding: '5px' }}>
            <Label style={{ margin: '10px' }} size="large">Start: </Label>
            <DateTimePicker
              value={new Date(this.state.startdate)}
              onChange={(date) => {
                this.setState({ startdate: date });
                this.value = this.state.startdate;
              }}
            />
          </Form.Field>
          <Form.Field style={{ padding: '5px' }}>
            <Label style={{ margin: '10px' }} size="large">Duration: </Label>
            <Button value={8} type="button" onClick={this.handleDurationButtonClick} color="olive">8 hours</Button>
            <Button value={12} type="button" onClick={this.handleDurationButtonClick} color="olive">12 hours</Button>
            <Button value={16} type="button" onClick={this.handleDurationButtonClick} color="olive">16 hours</Button>
            <Button value={20} type="button" onClick={this.handleDurationButtonClick} color="olive">20 hours</Button>
            <Button value={24} type="button" onClick={this.handleDurationButtonClick} color="olive">24 hours</Button>
          </Form.Field>
          <Form.Field style={{ padding: '5px' }}>
            <Label style={{ margin: '10px' }} size="large">End: </Label>
            <DateTimePicker
              value={new Date(this.state.enddate)}
              onChange={(date) => {
                this.setState({ enddate: date });
                this.value = this.state.enddate;
              }}
            />
          </Form.Field>
          <Button style={{ backgroundColor: '#DDA15E', color: 'white' }} type="submit">Confirm</Button>
        </form>
      </div>
    );
  }
}
