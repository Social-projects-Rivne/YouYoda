import API from './axiosConf';

async function logOut() {
    try {
        await API.get('user/logout', {headers: { Authorization: "Token " + localStorage.getItem('token')}})
            localStorage.removeItem('token');
    } catch (error) {
        throw TypeError('Error: ' + error.message);
    }
}

export { logOut };
