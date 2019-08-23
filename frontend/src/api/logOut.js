import { API } from './axiosConf';


async function logOut() {
    try {
        const response = await API.get('user/logout')
            .then(function(response) {
                console.log(response);
                if (response.status === 204) {
                   localStorage.removeItem('token');
                } 
            })
    } catch (error) {
        console.log('Error: ' + error.message);
    }
}

export { logOut };