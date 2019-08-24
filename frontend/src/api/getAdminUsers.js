import API from './axiosConf';


async function getUsersList() {
    try {
        const response = await API.get('users/getlist', 
            {
                crossdomain: true,
                headers: { Authorization: "Token " + localStorage.getItem('token')}
            })
            .then(function(response) {
                if(response.status == 200){
                    if(response.data.length > 0)
                        return response.data;
                    else
                        return [];
                }
            })
            .catch(function(error) {
                console.log('Error: ' + error);
            });
            return response;
    } catch (error) {
        console.log('Error: ' + error.message);
    }
}
export {getUsersList}