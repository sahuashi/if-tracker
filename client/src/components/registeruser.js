import React from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

export default class RegisterUser extends React.Component{
    constructor(props){
        super(props);
        this.state = { username: '', password: '' , error: ''};
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleUsernameChange(event) {
        this.setState({username: event.target.value});
    }

    handlePasswordChange(event) {
        this.setState({password: event.target.value});
    }

    handleSubmit(event){
        event.preventDefault();

        const User = {
            username: this.state.username,
            password: this.state.password
        };

        console.log(User);

        axios.post('http://localhost:5000/user/signup', User)
        .then(res => {
            console.log(res.data);
            if(res.data.status === 404){
                this.setState({
                    username: '',
                    password: '',
                    error: res.data.message + ". Please try again."
                });
            }
            else{
                const user = res.data;
                console.log(user);
                window.location = "/fasts"
            }
        })
    }

    render(){
        return (
            <div>
            <h1>Register User!</h1>
            { this.state.error && <Alert variant="danger"> {this.state.error} </Alert>}
            <Form onSubmit={this.handleSubmit}>
                <Form.Group>
                    <Form.Control type="text" placeholder="Username" value={this.state.username} onChange={this.handleUsernameChange}/>
                    <br/>
                    <Form.Control type="password" placeholder="Password" value={this.state.password} onChange={this.handlePasswordChange}/>
                </Form.Group>
                <Button variant="primary" type="submit">Submit</Button>
            </Form>
            </div>
        );
    }
}