import React from 'react';
import axios from 'axios';
//import auth from './authprovider';

export default class MyFasts extends React.Component {

    constructor(props){
        super(props);

        console.log(this.props);
    }

    //componentDidMount() {
        //auth();
    //}

    render() {
        return (
            <div>
            <h1>Fasts List!</h1>
            {this.props.user.isLoggedIn && <h1> You're logged in and able to view saved fasts</h1>}
            </div>
        );
    }
}