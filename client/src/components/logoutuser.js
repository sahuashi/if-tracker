import React from 'react';
import axios from 'axios'
import { Alert } from 'react-bootstrap'

export default class LogoutUser extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            username: ''
        }
    }
    componentDidMount(){
        const config = {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
            },
          };
        axios.get('http://localhost:5000/user/logout', config)
        .then(res => {
            console.log(res);
            this.setState({
                username: res.data.msg
            });
            this.props.onChange({
                id: 100,
                isLoggedIn: false,
            })
            console.log(this.props);
        })
        .catch(err => {console.log(err)})
    }
    
    render(){
        return (
            <div>
            <h1>Logout Screen</h1>
            { this.state.username && <Alert variant="success"> Successfully logged out, {this.state.username}</Alert>}
            </div>
        );
    }
}