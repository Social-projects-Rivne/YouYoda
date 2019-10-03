import { toast } from 'react-toastify';
import { API } from './axiosConf';


const URL_GET_SUBSCRIBE_COURSE = 'user/course/checksubscribe',
      URL_GET_SUBSCRIBE_EVENT = 'user/event/checksubscribe';

async function getUserSubscribeData(typeItem, course_id) {
    var urlConnect = '',
        tokenUser = localStorage.getItem('token');

    if(typeItem === 'course')
        urlConnect = URL_GET_SUBSCRIBE_COURSE;
    else if(typeItem === 'event')
        urlConnect = URL_GET_SUBSCRIBE_EVENT;
    else
        return false;

    if(!course_id || !tokenUser)
        return false;

    try {
        let response = await API.get(urlConnect,
            {
                "course_id": course_id,
                "token": tokenUser,
            });
        return response.data;
    }
    catch (error) {
        //toast.error(error.message);
        return false;
    }
}

export { getUserSubscribeData };
