import axios from 'axios';

import API from './axiosConf';


async function userLogin(props) {
    const { email, password } = props;
    try {
        const response = await API.post('user/login', { email, password })
            .then(function(response) {
                console.log(response);
                if (response.status === 202) {
                    console.log("Login successfull");
                    alert("Login successfull");
                    const AUTH_TOKEN = response.data.token;
                    console.log(AUTH_TOKEN)
                    localStorage.setItem('token', AUTH_TOKEN)
                    axios.defaults.headers.common['Authorization'] = "Token " + localStorage.getItem('token')
                    console.log(axios.defaults.headers.common['Authorization'])
                } else if (response.status === 400) {
                    console.log("Username password do not match");
                    alert("username password do not match");
                } else {
                    console.log("Username does not exists");
                    alert("Username does not exist");
                }
            })
    } catch (error) {
        console.log('Error: ' + error.message);
    }
}

export { userLogin};

async function userSocialLogin(props) {
    const { email, access_token } = props;
    try {
        const response = await API.post('user/social/login', { email, access_token })
            .then(function(response) {
                console.log(response);
                if (response.status === 202) {
                    console.log("Login successfull");
                    alert("Login successfull");
                    const AUTH_TOKEN = response.data.token;
                    console.log(AUTH_TOKEN)
                    localStorage.setItem('token', AUTH_TOKEN)
                    axios.defaults.headers.common['Authorization'] = "Token " + localStorage.getItem('token')
                    console.log(axios.defaults.headers.common['Authorization'])
                } else if (response.status === 400) {
                    console.log("Username password do not match");
                    alert("username password do not match");
                } else {
                    console.log("Username does not exists");
                    alert("Username does not exist");
                }
            })
    } catch (error) {
        console.log('Error: ' + error.message);
    }
}

export { userSocialLogin};
