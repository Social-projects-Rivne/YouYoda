import { API } from './axiosConf';
import { toast } from 'react-toastify';


async function registration(props) {
    var nameU = props.email.split('@', 1);
    var datasend = {
        "username": nameU[0],
        "password": props.password,
        "email": props.email,
        "is_trainer": props.userteacher
    }
    try {
        const response = await API.post(
            'user/register',
            datasend,
            {
				crossdomain: true,
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(response => {
                if(response.status === 201){
                    toast.success("Registration successfull");
                }
                else if(response.status === 400){
                    toast.error("User data incorrect");
                }
                else{
                    toast.error("Database error");
                }
            });
    } catch (error) {
        toast.error("Database error");
    }
}

export { registration };
