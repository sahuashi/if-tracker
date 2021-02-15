import React from 'react';
import axios from 'axios';
import Fast from './fast';

export default class FastList extends React.Component{
    constructor(props){
        super(props);
        console.log(props);
        this.state = {fasts: []};
        this.getFasts = this.getFasts.bind(this);
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
        .then(res => {
            console.log(res)
            console.log(res.data);
            this.setState({fasts: res.data})
        })
        .catch(err => console.log(err));
    }

    render(){
        return (
        <div>
            {this.state.fasts.map((fast, i) => (
            <p key={i}>
                <Fast start={fast.startTime} end={fast.endTime}/>
            </p>
            ))}
        </div>
        );
    }
}