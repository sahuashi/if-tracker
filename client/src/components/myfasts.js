import React from 'react';
import axios from 'axios';


export default class MyFasts extends React.Component{

    render(){
        const config = {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
            },
          };
        axios.get('http://localhost:5000/user/auth', config)
        .then(res => {
            const user = res.data;
            console.log(user);
            //console.log(res);
        })
        return (
            <h1>Fasts List!</h1>
        );
    }
}