import React from "react";

import { toast } from 'react-toastify';

import { API } from './axiosConf';


async function registration(props) {
    var nameU = props.email.split('@', 1);
    var datasend = {
        "username": nameU[0],
        "password": props.password,
        "email": props.email,
        "is_trainer": props.userteacher
    }
    try {
        const response = await API.post('/user/register', datasend)
        toast.success('Registration successfull');
    }
    catch (error) {
        throw TypeError('Error' + error.message);
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
        const response = await API.post('/user/social/register', datasend)
        toast.success('Registration successfull');
    }
    catch (error) {
        throw TypeError('Error' + error.message);
    }
}

export { socialRegistration };
