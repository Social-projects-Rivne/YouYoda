import React from "react";

import axios from 'axios';


async function userLogin(props) {
    const apiBaseUrl = "http://localhost:8000/api/";
    const { email, password } = props ;
    try {
        const response = axios.post(apiBaseUrl + 'login', { email, password })
            .then(function(response) {
                console.log(response);
                if (response.data.code === 200) {
                    console.log("Login successfull");
                } else if (response.data.code === 204) {
                    console.log("Username password do not match");
                    alert("username password do not match");
                } else {
                    console.log("Username does not exists");
                    alert("Username does not exist");
                }
            })
    } catch (error) {
        console.log(error);
    }
}

export { userLogin };


