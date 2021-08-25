import React from 'react';

import axios from 'axios';
import {
  Button, Input, Form, Message,
} from 'semantic-ui-react';

export default class RegisterUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: '', password: '', error: '' };
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUsernameChange(event) {
    this.setState({ username: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    const User = {
      username: this.state.username,
      password: this.state.password,
    };

    axios.post('/user/signup', User)
      .then((res) => {
        if (res.data.status === 404) {
          this.setState({
            username: '',
            password: '',
            error: `${res.data.message}. Please try again.`,
          });
        } else {
          this.props.history.replace({
            pathname: '/login',
            data: {
              msg: 'User successfully registered! Please login to continue.',
            },
          });
        }
      });
  }

  render() {
    return (
      <div style={{
        display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '85%',
      }}
      >
        <h3>Create Account</h3>
        { this.state.error && (
        <Message error>
          {' '}
          {this.state.error}
          {' '}
        </Message>
        )}
        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            <label>Username</label>
            <Input
              type="text"
              placeholder="Username"
              value={this.state.username}
              onChange={this.handleUsernameChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <Input
              type="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handlePasswordChange}
            />
          </Form.Field>
          <Button style={{ backgroundColor: '#DDA15E', color: 'white' }} type="submit">Register</Button>
        </Form>
      </div>
    );
  }
}
