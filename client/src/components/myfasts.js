import React from 'react';
import {Button} from 'react-bootstrap';
import axios from 'axios';

export default class MyFasts extends React.Component {

    constructor(props){
        super(props);
        console.log(this.props);
    }

    render() {
        return (
            <div>
            {this.props.user.isLoggedIn && <div>
                <h1>Fasts List!</h1> <br/> 
                <h1>You're logged in and able to view saved fasts</h1></div>}
            {!this.props.user.isLoggedIn && <div> 
                <h1>You must log in to view your fasts!</h1>
                <Button variant="info" href='/user/signup'>Signup</Button>
                <Button variant="info" href='/user/login'>Login</Button></div>}
            </div>
        );
    }
}