import React from "react";

import API from './axiosConf';


async function editForm(props) {
    // const apiBaseUrl = "http://localhost:8000/api/";
    // const apiBaseUrl = "api/user/profile/edit";
    const {first_name, last_name, location, username, email, password, about_me, birth_date, phone_number} = props;
    try {
        const response = API.put("/user/profile/edit", props,
         { crossdomain: true }
            // headers: { 'Authorization': authorization }
        )
        .then(function (response) {
        console.log(response);
        if(response.data.code === 204){
            console.log("Successfull");
            alert("Password was changed")
        }
        else if(response.data.code === 400){
            console.log("Bad request");
        }
        else{
            console.log("Something goes wrong");
        }
    })
   
} catch
(error)
{
    console.log("error", error);
}
}

export {editForm};


