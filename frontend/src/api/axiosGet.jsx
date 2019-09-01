import { API } from './axiosConf';


async function axiosGet(path) {
    try {
        const response = await API.get(path)
    } catch (error) {
        throw TypeError('Error: ' + error.message);
    }
}
export { axiosGet }