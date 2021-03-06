import { API } from './axiosConf';


async function userLogin(props) {
    const { email, password } = props;
    try {
        const response = await API.post('user/login', { email, password })
            const AUTH_TOKEN = response.data.token;
            localStorage.setItem('token', AUTH_TOKEN)
            localStorage.setItem('avatar_url', response.data.avatar_url)
    } catch(error) {
        throw TypeError('Error: ' + error.message);
    };
}

async function userSocialLogin(props) {
    const { email, access_token, network_name } = props;
    try {
        const response = await API.post('user/social/login', { email, access_token, network_name })
            const AUTH_TOKEN = response.data.token;
            localStorage.setItem('token', AUTH_TOKEN)
            localStorage.setItem('avatar_url', response.data.avatar_url)
    } catch (error) {
        throw TypeError('Error: ' + error.message);
    }
}

export { userLogin, userSocialLogin };
