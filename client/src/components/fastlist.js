import React from 'react';
import axios from 'axios';
import Fast from './fast';
import { Badge, Button } from 'react-bootstrap';

export default class FastList extends React.Component{
    constructor(props){
        super(props);
        console.log(props);
        this.getFasts = this.getFasts.bind(this);
        this.deleteFast = this.deleteFast.bind(this);
        this.state = {fasts: []};
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
            this.setState({fasts: res.data})
        })
        .catch(err => console.log(err));
    }

    deleteFast(id){
        axios.delete(`http://localhost:5000/fasts/${id}`)
        .then(res => {
            this.setState({fasts: this.state.fasts.filter(fast => fast._id !== id)})
        });
    }

    render(){
        return (
        <div>
            <div className="mt-3 mb-3">
            <h4 className="text-center d-inline">Logged Fasts <Badge pill variant="info">{this.state.fasts.length}</Badge></h4>
            <Button variant="info" className="d-inline float-right" onClick={()=> {this.props.history.replace("/fasts/add")}}>Add Fast</Button></div>
            {this.state.fasts.map((fast, i) => (
            <div key={fast._id}>
                <Fast id={fast._id} 
                start={fast.startTime} 
                end={fast.endTime} 
                deleteFast={this.deleteFast} 
                history={this.props.history}/><br/>
            </div>
            ))}
            {!this.state.fasts.length && <div>No fasts to display.</div>}
        </div>
        );
    }
}