import { API } from './axiosConf';

async function logOut() {
    try {
        await API.get('user/logout')
            localStorage.removeItem('token');
            localStorage.removeItem('is_trainer');
            localStorage.removeItem('role');
            localStorage.removeItem('avatar_url')
    } catch (error) {
    	localStorage.removeItem('token');
      localStorage.removeItem('is_trainer');
      localStorage.removeItem('role');
      localStorage.removeItem('avatar_url')
        throw TypeError('Error: ' + error.message);
    }
}

export { logOut };
