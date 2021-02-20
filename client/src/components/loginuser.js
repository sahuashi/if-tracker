import React from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios'

export default class LoginUser extends React.Component{

    constructor(props){
        super(props);
        this.state = { 
            username: '', 
            password: '' , 
            error: '', 
            msg: this.props.location.data? this.props.location.data.msg : '' }
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
        
        axios.post('http://localhost:5000/user/login', User, { withCredentials: true})
        .then(res => {
            if(res.data.route === 'signup'){
                this.setState({
                    username: '',
                    password: '',
                    error: "Incorrect username/password. Please try again."
                });
            }
            else{
                this.auth();
            }
        })
    }

    auth() {
        var id = "";
        const config = {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            },
        };
        axios.get('http://localhost:5000/user/auth', config)
            .then(res => {
                console.log(res.data._id);
                id = res.data._id;
                this.update(id);
            })
    }

    update(id){
        this.props.onChange({
            id: id,
            isLoggedIn: true,
        })
        this.props.history.replace('/fasts');
    }
    
    render(){
        return (
            <div className="text-center">
            <h3 className="mt-3 mb-3">Login User</h3>
            { this.state.error && <Alert variant="danger"> {this.state.error} </Alert>}
            { (!this.state.error && this.state.msg) && <Alert variant="success"> {this.state.msg}</Alert>}
            <Form onSubmit={this.handleSubmit}>
                <Form.Group>
                    <Form.Control type="text" 
                    placeholder="Username" 
                    value={this.state.username} 
                    onChange={this.handleUsernameChange}/>
                    <br/>
                    <Form.Control type="password" 
                    placeholder="Password" 
                    value={this.state.password} 
                    onChange={this.handlePasswordChange}/>
                </Form.Group>
                <Button variant="primary" type="submit">Submit</Button>
            </Form>
            </div>
        );
    }
}