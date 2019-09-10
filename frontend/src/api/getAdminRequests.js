import { API } from './axiosConf';


async function getRequestsList(status) {
    const dataSend = {
        params: {status_code: status}
    };
    try {
        const response = await API.get('user/totrainer/getrequest', dataSend);
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}

/**
 * Approves or Rejects requests from users to become trainers
 * @param {object} dataSend - {
 *  "status_code": one of the next values: 'N','A' or 'R';
 *  "is_trainer": true or false;
 *  "id": object of Users, authors of those Requests;
 *  "data_obj": object of Comments and Requests ids
 * }
 * @returns {Promise} Promise with boolean value - true or false, or error
*/
async function patchRequests(dataSend) {
    const STATUS_CODES = ['N','A','R'];
    if(STATUS_CODES.indexOf(dataSend.status_code) == -1)
        return false;
    try {
        await API.patch('user/totrainer', dataSend);
        return true;
    } catch (error) {
        return Promise.reject(error);
    }
}

export {getRequestsList, patchRequests}