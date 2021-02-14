import axios from 'axios';

export default function auth() {
    const config = {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
        },
    };

    axios.get('http://localhost:5000/user/auth', config)
        .then(res => {
            const user = res.data._id;
            return user;
        })
}