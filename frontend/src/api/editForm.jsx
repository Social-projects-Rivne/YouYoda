import React from "react";

import API from './axiosConf';


async function editForm(props) {
    // const apiBaseUrl = "http://localhost:8000/api/";
    // const apiBaseUrl = "api/user/profile/edit";
    const {first_name, last_name, location, username, email, password, about_me, birth_date, phone_number} = props;
    try {
        const response = API.post("/user/profile/edit", props
            // headers: { 'Authorization': authorization }
        )
//             console.log(response)
//             .then(response => {
//             this.setState({
//
//               first_name:response.data.first_name,
//               last_name:response.data.last_name,
//               location:response.data.location,
//               username:response.data.username,
//               email:response.data.email,
//               // password:response.data.password,
//               about_me:response.data.about_me,
//               birth_date:response.data.birth_date,
//               phone_number:response.data.phone_number
//             })
//           })
//
//
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


