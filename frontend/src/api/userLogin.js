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
                    const user_token = response.data.token;
                    console.log(user_token)
                    axios.defaults.headers.common['Authorization'] = user_token;
                } else if (response.status === 401) {
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

export { userLogin };


