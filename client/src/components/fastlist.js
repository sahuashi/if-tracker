import React from 'react';
import axios from 'axios';

export default class FastList extends React.Component{
    constructor(props){
        super(props);
        console.log(props);
    }

    componentDidMount(){
        this.getFasts();
    }

    getFasts(){
        const config = {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            },
            params: {
                id: this.props.user.id
            }
        };
        axios.get('http://localhost:5000/fasts/', config)
        .then(res => console.log(res))
        .catch(err => console.log(err));
    }

    render(){
        return (<h1>Hello fast list</h1>);
    }
}