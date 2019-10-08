import { API } from './axiosConf';


async function getUsersList() {
    try {
        const response = await API.get('users/getlist')
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}

async function patchRequests(dataSend) {
    try {
        const response = await API.patch('users/updateusersdata', dataSend);
        return response;
    } catch (error) {
        return Promise.reject(error);
    }
}
export {getUsersList, patchRequests}