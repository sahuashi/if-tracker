import React from 'react';
import axios from 'axios';
import { UserContext } from './user';


export default class MyFasts extends React.Component{
    static contextType = UserContext;
    componentDidMount(){
        const config = {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
            },
          };
        axios.get('http://localhost:5000/user/auth', config)
        .then(res => {
            //console.log(res);
            if(res.data.status !== "unauth"){
                const user = res.data;
                console.log(user);
                const context = this.context;
                const u = res.data;
                context.setUserID(u._id);
                context.setUsername(u.username);
                context.setAuthentication(true);
                console.log(context.name);
                console.log(context.user_id);
                console.log(context.isAuthenticated);
            }
            else{
                window.location = "/user/login"
            }
            //console.log(user);
        })
    }

    render(){
        return (
            <h1>Fasts List!</h1>
        );
    }
}