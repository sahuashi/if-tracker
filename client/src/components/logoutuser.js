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
            this.setState({
                username: res.data.msg
            });
            this.props.onChange({
                id: "",
                isLoggedIn: false,
            })
            this.props.history.replace('/fasts/');
        })
        .catch(err => {console.log(err)})
    }
    
    render(){
        return (
            <div>
            { this.state.username && <Alert variant="success"> Successfully logged out, {this.state.username}</Alert>}
            </div>
        );
    }
}