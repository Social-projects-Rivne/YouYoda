import { API } from './axiosConf';


async function axiosPost (pathurl, userdata) {
    try {
        await API.post(pathurl, userdata)
        }
    catch(error) {
        throw TypeError('Error: ' + error.message);
    };
}

export { axiosPost };
