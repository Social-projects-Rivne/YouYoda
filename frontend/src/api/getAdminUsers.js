import { API } from './axiosConf';


async function getUsersList() {
    try {
        const response = await API.get('users/getlist')
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}
export {getUsersList}