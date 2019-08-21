import axios from 'axios';

import API from './axiosConf';

async function isAuthorized() {
    var tokenUser = localStorage.getItem('token');
    const apiBaseUrl = "http://localhost:8000/";
    var datasend = {
        "token": tokenUser,
        "checkParam": "authorized"
    }
    console.log(datasend);
    try {
        const response = await axios.post(
            apiBaseUrl + 'api/user/check',
            datasend,
            {
				crossdomain: true,
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(response => {
                console.log(response);
                if(response.status === 200){
                    console.log("200");
                }
                else if(response.status === 400){
                    console.log("User data incorrect");
                }
                else{
                    console.log("Database error");
                }
            });
    } catch (error) {
        console.log(error);
    }

    return tokenUser;
}

export {isAuthorized}