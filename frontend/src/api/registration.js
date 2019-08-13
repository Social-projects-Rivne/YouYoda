import React from "react";

import axios from 'axios';


async function registration(props) {
    const apiBaseUrl = "http://localhost:8000/";
    props["is_trainer"] = props.userteacher;
    props["username"] = props.email;
    try {
        const response = await axios.post(
            apiBaseUrl + 'api/user/register', 
            props, 
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
