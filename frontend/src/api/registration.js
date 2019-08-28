import React from "react";

import axios from 'axios';
import { toast } from 'react-toastify';

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
                    toast.success('Registration successfull');
                }
                else if(response.status === 400){
                    toast.warn('User data incorrect');
                }
                else{
                    toast.error('Database error');
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
                    toast.success('Registration successfull');
                }
                else if(response.status === 400){
                    toast.warn('User data incorrect');
                }
                else{
                    toast.error('Database error');
                }
            });
    } catch (error) {
        console.log(error);
    }
}

export { socialRegistration };
