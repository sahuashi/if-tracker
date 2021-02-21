import React from 'react';
import {Alert, Button} from 'react-bootstrap';
import FastList from './fastlist';

export default class MyFasts extends React.Component {

    constructor(props){
        super(props);
        this.state = {msg: this.props.location.data? this.props.location.data.msg : ''};
    }

    render() {
        return (
            <div>
            { this.state.msg && <Alert className="text-center" variant="success">{this.state.msg}</Alert>}
            {this.props.user.isLoggedIn &&
                <FastList user={this.props.user} history={this.props.history}></FastList>}
            {!this.props.user.isLoggedIn && 
                <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '80vh'}}>
                    <div className="text-center">
                            <h3 className="mt-3">Hi, there! 🤚</h3>
                            <p>To track your fasts, you must create an account or login to an existing account.</p>
                            <Button className="mx-2 my-3" variant="info" onClick={()=> {this.props.history.push('/user/signup')}}>Signup</Button>
                            <Button className="mx-3 my-3" variant="info" onClick={()=> {this.props.history.push('/user/login')}}>Login</Button>
                    </div>
                </div>}
            </div>
        );
    }
}