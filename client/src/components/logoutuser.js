import React from 'react';
import axios from 'axios'

export default class LogoutUser extends React.Component{

    componentDidMount(){
        const config = {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
            },
          };
        axios.get('http://localhost:5000/user/logout', config)
        .then(res => {
            this.props.onChange({
                id: "",
                isLoggedIn: false,
            })
            this.props.history.replace({
                pathname: '/fasts/',
                data: { msg: `Successfully logged out, ${res.data.msg}!` }});
        })
        .catch(err => {console.log(err)})
    }
    
    render(){
        return (
            <div></div>
        );
    }
}