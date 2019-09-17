import { API } from './axiosConf';


async function getUsersStatusesList() {
    try {
        const response = await API.get('users/getstatuses')
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}

async function patchRequests(dataSend) {
    try {
        await API.patch('users/updatestatuses', dataSend);
        return true;
    } catch (error) {
        return Promise.reject(error);
    }
}

export {getUsersStatusesList, patchRequests}