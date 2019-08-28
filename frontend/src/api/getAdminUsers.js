import API from './axiosConf';


async function getUsersList() {
    try {
        const response = await API.get('users/getlist', 
            {
                crossdomain: true,
                headers: { Authorization: "Token " + localStorage.getItem('token')}
            })
        return response.data;
    } catch (error) {
        throw TypeError('Error: ' + error.message);
    }
}
export {getUsersList}