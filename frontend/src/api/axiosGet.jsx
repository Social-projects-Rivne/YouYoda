import { API } from './axiosConf';


async function axiosGet(path) {
    try {
        const response = await API.get(path);
        return response.data;
    } catch (error) {
        throw TypeError('Error: ' + error.message);
    }
}
export { axiosGet }
