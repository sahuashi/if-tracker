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
            if (res.data.status === "unauth") {
                window.location = "/user/login"
            }
            else {
                updateState(res);
            }
        })
}

function updateState(res) {
    console.log(res.data);
    this.props.onChange({
        id: res.data._id,
        isLoggedIn: true,
    })
}