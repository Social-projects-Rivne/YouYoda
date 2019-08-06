import API from './axiosConf';


async function resetPassword(email){
    const response = await API.post('auth/users/reset_password/', email)
    alert("cccccc")
    .then(function (response) {
        console.log(response);
        alert("Password confirmation has been sent to your email")
        if(response.data.code === 204){
            console.log("Successfull");
        }
        else if(response.data.code === 400){
            console.log("Bad request");
        }
        else{
            console.log("Something goes wrong");
            }
    })
    .catch(function (error) {
        console.log(error);
    });
}

async function newPassword (userdata) {
    const response = await API.post('auth/users/reset_password_confirm/', userdata)
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
    .catch(function (error) {
        console.log(error);
    });

}

export { resetPassword, newPassword };
