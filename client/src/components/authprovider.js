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
    const context = this.context;
    console.log(res.data);
    context.setUserID(res.data._id);
    context.setUsername(res.data.username);
    context.setAuthentication(true);
    console.log(context.name);
    console.log(context.user_id);
    console.log(context.isAuthenticated);
}