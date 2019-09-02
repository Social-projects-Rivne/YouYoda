import axios from 'axios';

import {API} from './axiosConf';


async function userLogin(props) {
    const { email, password } = props;
    try {
        const response = await API.post('user/login', { email, password })
            .then(function(response) {
                if (response.status === 202) {
                    const AUTH_TOKEN = response.data.token;
                    localStorage.setItem('token', AUTH_TOKEN)
                    axios.defaults.headers.common['Authorization'] = "Token " + localStorage.getItem('token')
                }
            })
    } catch(error) {
        throw TypeError('Error: ' + error.message);
    };
}

export { userLogin };
