import { API } from './axiosConf';


const URL_GET_SUBSCRIBE_COURSE = 'user/course/checksubscribe';
const URL_GET_SUBSCRIBE_EVENT = 'user/event/checksubscribe';

async function getUserSubscribeData(typeItem, item_id) {
    let urlConnect = '';
    let tokenUser = localStorage.getItem('token');

    if(!item_id || !tokenUser)
        return false;
    
    var paramsData = {
        "token": tokenUser,
    }

    if(typeItem === 'course') {
        urlConnect = URL_GET_SUBSCRIBE_COURSE;
        paramsData["course_id"] = item_id;
    }
    else if(typeItem === 'event') {
        urlConnect = URL_GET_SUBSCRIBE_EVENT;
        paramsData["event_id"] = item_id;
    }
    else
        return false;

    try {
        let response = await API.get(urlConnect, {params: paramsData});
            if (response.status !== 208) {
                return false;
            }
            return response.data;

    }
    catch (error) {
        return false;
    }
}

export { getUserSubscribeData };
