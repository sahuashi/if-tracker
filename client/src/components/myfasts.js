import React from 'react';
import {Button} from 'react-bootstrap';
import FastList from './fastlist';

export default class MyFasts extends React.Component {

    constructor(props){
        super(props);
        console.log(this.props);
    }

    render() {
        return (
            <div>
            {this.props.user.isLoggedIn && <div>
                <h1>List of Fasts:</h1> <br/>
                <FastList user={this.props.user} history={this.props.history}></FastList>
                </div>}
            {!this.props.user.isLoggedIn && <div> 
                <h1>You must log in to view your fasts!</h1>
                <Button variant="info" href='/user/signup'>Signup</Button>
                <Button variant="info" href='/user/login'>Login</Button></div>}
            </div>
        );
    }
}