import React from "react";

import axios from 'axios';


async function registration(props) {
    const apiBaseUrl = "http://localhost:8000/api/";
    const { email, password, confirmpass, userstudent, userteacher, isagreed } = props;
    try {
        const response = await axios.post(
            apiBaseUrl + 'register', 
            { email, password, confirmpass, userstudent, userteacher, isagreed }, 
            {
                headers: {
                    'Accept' : 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                console.log(response);
                if(response.data.code === 201){
                    console.log("Registration successfull");
                    alert("Registration successfull");
                }
                else if(response.data.code === 400){
                    console.log("Username password do not match");
                    alert("username password do not match");
                }
                else{
                    console.log("Username does not exists");
                    alert("Username does not exist");
                }
            });
    } catch (error) {
        console.log(error);
    }
}

export { registration };
