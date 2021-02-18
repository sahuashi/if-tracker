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
            {this.props.user.isLoggedIn &&
                <FastList user={this.props.user} history={this.props.history}></FastList>}
            {!this.props.user.isLoggedIn && 
                <div className="text-center">
                <h3 className="mt-3">You must create an account or login to add and view your fasts.</h3>
                <Button className="mx-3 my-3" variant="info" href='/user/signup'>Signup</Button>
                <Button className="mx-3 my-3" variant="info" href='/user/login'>Login</Button></div>}
            </div>
        );
    }
}