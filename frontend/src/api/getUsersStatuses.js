import { API } from './axiosConf';


async function getUsersStatusesList() {
    try {
        const response = await API.get('users/getstatuses')
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}
export {getUsersList}