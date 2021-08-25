import React from 'react';

import axios from 'axios';
import {
  Form, Input, Message, Button,
} from 'semantic-ui-react';

export default class LoginUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      error: '',
      msg: this.props.location.data ? this.props.location.data.msg : '',
    };
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

    axios.post('/user/login', User, { withCredentials: true })
      .then((res) => {
        if (res.data.msg === 'login') {
          this.setState({
            username: '',
            password: '',
            error: 'Incorrect username/password. Please try again.',
          });
        } else {
          this.auth();
        }
      });
  }

  auth() {
    let id = '';
    const config = {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    };
    axios.get('/user/auth', config)
      .then((res) => {
        id = res.data._id;
        this.update(id);
      });
  }

  update(id) {
    this.props.onChange({
      id,
      isLoggedIn: true,
    });
    this.props.history.replace('/');
  }

  render() {
    return (
      <div style={{
        display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '85%',
      }}
      >
        <h3>Login</h3>
        { this.state.error && (
        <Message error>
          {' '}
          {this.state.error}
          {' '}
        </Message>
        )}
        { (!this.state.error && this.state.msg) && (
        <Message success>
          {' '}
          {this.state.msg}
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
          <Button color="olive" type="submit">Login</Button>
        </Form>
      </div>
    );
  }
}
