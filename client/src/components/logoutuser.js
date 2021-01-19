import React from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios'

export default class LogoutUser extends React.Component{
    onComponentDidMount(){
        axios.get('http://localhost:5000/user/logout', { withCredentials: true})
        .then(res => {console.log(res)})
    }
    
    render(){
        return (
            <div>
            <h1>Logout User!</h1>
            </div>
        );
    }
}