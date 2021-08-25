import React from 'react';

import { Button } from 'semantic-ui-react';

import FastList from './FastList';

export default class MyFasts extends React.Component {
  constructor(props) {
    super(props);
    const message = this.props.location.data ? this.props.location.data.msg : '';
    this.state = { msg: message };
  }

  render() {
    return (
      <div>
        {this.props.user.isLoggedIn
                    && <FastList user={this.props.user} history={this.props.history} />}
        {!this.props.user.isLoggedIn
                    && (
                    <div style={{
                      display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '85%',
                    }}
                    >
                      <div>
                        <h3>Hi! 👋</h3>
                        <p>To track your fasts, you must create an account or login to an existing account.</p>
                        <Button style={{ backgroundColor: '#DDA15E', color: 'white' }} onClick={() => { this.props.history.push('/signup'); }}>Signup</Button>
                        <Button color="olive" onClick={() => { this.props.history.push('/login'); }}>Login</Button>
                      </div>
                    </div>
                    )}
      </div>
    );
  }
}
