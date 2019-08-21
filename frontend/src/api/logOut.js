import axios from 'axios';

import API from './axiosConf';


async function logOut() {
    try {
        const response = await API.get('user/logout', {headers: { Authorization: "Token " + localStorage.getItem('token')}})
            .then(function(response) {
                console.log(response);
                if (response.status === 200) {
                    console.log("Logout successfull");
                    alert("Logout successfull");
                    localStorage.removeItem('token');
                } else {
                    console.log("You can't logout");
                    alert("You can't logout");
                }
            })
    } catch (error) {
        console.log('Error: ' + error.message);
    }
}

export { logOut };