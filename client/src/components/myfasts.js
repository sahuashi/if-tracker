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
        axios.get('http://localhost:5000/user/account', config)
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        })
        return (
            <h1>Fasts List!</h1>
        );
    }
}