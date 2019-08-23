import {API} from './axiosConf';


async function sendDataToDjoser (pathurl, userdata) {
        try {
            const response = await API.post(pathurl, userdata)
            .then(function (response) {
                console.log(response);
                if(response.status === 204){
                    console.log("Successfull");
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

export { sendDataToDjoser };
