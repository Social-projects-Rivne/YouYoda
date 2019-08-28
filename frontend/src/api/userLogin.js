import { API } from './axiosConf';


async function userLogin(props) {
    const { email, password } = props;
    try {
        const response = await API.post('user/login', { email, password })
            const AUTH_TOKEN = response.data.token;
            localStorage.setItem('token', AUTH_TOKEN) 
    } catch(error) {
        throw TypeError('Error: ' + error.message);
    };
}

export { userLogin };


