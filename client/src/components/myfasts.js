import React from 'react';
import { Button } from 'semantic-ui-react'
import FastList from './fastlist';

export default class MyFasts extends React.Component {

    constructor(props) {
        super(props);
        this.state = { msg: this.props.location.data ? this.props.location.data.msg : '' };
    }

    render() {
        return (
            <div>
                {this.props.user.isLoggedIn &&
                    <FastList user={this.props.user} history={this.props.history}></FastList>}
                {!this.props.user.isLoggedIn &&
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '85%' }}>
                        <div>
                            <h3>Hi! 👋</h3>
                            <p>To track your fasts, you must create an account or login to an existing account.</p>
                            <Button style={{backgroundColor: '#DDA15E', color: 'white'}}  onClick={() => { this.props.history.push('/signup') }}>Signup</Button>
                            <Button color="olive" onClick={() => { this.props.history.push('/login') }}>Login</Button>
                        </div>
                    </div>
                }
            </div>
        );
    }
}