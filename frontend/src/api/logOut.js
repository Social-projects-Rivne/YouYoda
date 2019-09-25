import { API } from './axiosConf';

async function logOut() {
    try {
        await API.get('user/logout')
            localStorage.removeItem('token');
            localStorage.removeItem('is_trainer');
            localStorage.removeItem('role');
    } catch (error) {
    	localStorage.removeItem('token');
      localStorage.removeItem('is_trainer');
      localStorage.removeItem('role');
        throw TypeError('Error: ' + error.message);
    }
}

export { logOut };
