import React from "react";

import axios from 'axios';


async function userLogin(props) {
    const apiBaseUrl = "http://localhost:8000/api/";
    const { email, password } = props;
    console.log('function')
    try {
        const response = await axios.post(apiBaseUrl + 'user/login', { email, password })
            .then(function(response) {
                console.log(response);
                console.log('OKKKKKKKKKKKKKKKKK');
                if (response.status === 200) {
                    console.log("Login successfull");
                    const user_token = response.data.user_token;
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


