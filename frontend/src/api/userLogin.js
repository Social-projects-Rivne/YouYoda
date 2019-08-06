import React from "react";

import axios from 'axios';


async function userLogin(props) {
    const apiBaseUrl = "http://localhost:8000/api/";
    const { email, password } = props ;
    console.log('function')
    try {
        const response = await axios.post(apiBaseUrl + 'user/login', { email, password })
            .then(function(response) {
                console.log(response);
                if (response.data.code === 200) {
                    console.log("Login successfull");
                    const user_token = response.data.token;
                    if(user_token) {
                        axios.defaults.headers.common['Authorization'] = user_token;
                    }
                } else if (response.data.code === 401) {
                    console.log("Username password do not match");
                    alert("username password do not match");
                } else {
                    console.log("Username does not exists");
                    alert("Username does not exist");
                }
            })
    } catch (error) {
    	console.log('error');
        console.log(error);
    }
}

export { userLogin };



