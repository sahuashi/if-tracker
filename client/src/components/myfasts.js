import React from 'react';
import axios from 'axios';
import auth from './authprovider';

export default class MyFasts extends React.Component {

    componentDidMount() {
        auth();
    }

    render() {
        return (
            <h1>Fasts List!</h1>
        );
    }
}