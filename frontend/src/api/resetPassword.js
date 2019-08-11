import API from './axiosConf';


async function resetPassword(email){
    try {
        const response = await API.post('auth/users/reset_password/', email)
        console.log(response)
        .then(function (response) {
            console.log(response);
            alert("Password confirmation has been sent to your email")
            if(response.status === 204){
                console.log("Successfull");
            }
            else if(response.status === 400){
                console.log("Bad request");
            }
            else{
                console.log("Something goes wrong");
                }
        })
    }
    catch(error) {
        console.log('Error: ' + error.message);
    };
}

async function newPassword (userdata) {
        try {
            const response = await API.post('auth/users/reset_password_confirm/', userdata)
            console.log(response)
            .then(function (response) {
                console.log(response);
                if(response.status === 204){
                    console.log("Successfull");
                    alert("Password was changed")
                }
                else if(response.status === 400){
                    console.log("Bad request");
                }
                else{
                    console.log("Something goes wrong");
                }
            });
        }
    catch(error) {
        console.log('Error: ' + error.message);
    };

}

export { resetPassword, newPassword };
