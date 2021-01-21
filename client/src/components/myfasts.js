import React from 'react';
import axios from 'axios';
import { UserContext } from './user';


export default class MyFasts extends React.Component {
    static contextType = UserContext;
    componentDidMount() {
        this.initUser();
    }

    initUser() {
        const config = {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            },
        };
        axios.get('http://localhost:5000/user/auth', config)
            .then(res => {
                if (res.data.status === "unauth") {
                    window.location = "/user/login"
                }
                else {
                    this.updateState(res);
                }
            })
    }

    updateState(res) {
        const context = this.context;
        console.log(res.data);
        context.setUserID(res.data._id);
        context.setUsername(res.data.username);
        context.setAuthentication(true);
        console.log(context.name);
        console.log(context.user_id);
        console.log(context.isAuthenticated);
    }

    render() {
        return (
            <h1>Fasts List!</h1>
        );
    }
}