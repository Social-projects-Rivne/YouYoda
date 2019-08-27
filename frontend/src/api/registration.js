import React from "react";

import axios from 'axios';

import API from './axiosConf';


async function registration(props) {
    var nameU = props.email.split('@', 1);
    var datasend = {
        "username": nameU[0],
        "password": props.password,
        "email": props.email,
        "is_trainer": props.userteacher
    }
    try {
        const response = await API.post(
            '/user/register',
            datasend,
            {
				crossdomain: true,
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(response => {
                console.log(response);
                if(response.status === 201){
                    console.log("Registration successfull");
                    alert("Registration successfull");
                }
                else if(response.status === 400){
                    console.log("User data incorrect");
                    alert("User data incorrect");
                }
                else{
                    console.log("Database error");
                    alert("Database error");
                }
            });
    } catch (error) {
        console.log(error);
    }
}

export { registration };

async function socialRegistration(props) {
    var nameU = props.email.split('@', 1);
    var datasend = {
        "username": nameU[0],
        "password": props.password,
        "email": props.email,
        "is_trainer": props.userteacher,
        "first_name": props.first_name,
        "last_name": props.last_name,
        "avatar_url": props.picture
    }
    try {
        const response = await API.post(
            '/user/social/register',
            datasend,
            {
				crossdomain: true,
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(response => {
                console.log(response);
                if(response.status === 201){
                    console.log("Registration successfull");
                    alert("Registration successfull");
                }
                else if(response.status === 400){
                    console.log("User data incorrect");
                    alert("User data incorrect");
                }
                else{
                    console.log("Database error");
                    alert("Database error");
                }
            });
    } catch (error) {
        console.log(error);
    }
}

export { socialRegistration };
