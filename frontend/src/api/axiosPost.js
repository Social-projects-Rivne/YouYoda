import API from './axiosConf';


async function sendDataToDjoser (pathurl, userdata) {
    try {
        await API.post(pathurl, userdata)
        }
    catch(error) {
        throw TypeError('Error: ' + error.message);
    };  
}

export { sendDataToDjoser };
