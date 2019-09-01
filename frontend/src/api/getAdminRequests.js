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
export {getRequestsList}