import React from 'react';
import axios from 'axios';


export default class MyFasts extends React.Component{
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