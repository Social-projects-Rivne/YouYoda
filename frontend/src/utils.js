const ROLE_ADMIN = 3,
      ROLE_MODERATOR = 2;

export const HOSTNAME_PORT = "http://localhost:8000";

export const isAuthenticated = (dosmth) => {
    let show = "auth-display-none";
    if (localStorage.getItem('token')){
        if (dosmth === "show"){
            show = ""
        }
    } else {
        if (dosmth === "hide"){
            show = ""
        }
    }
    return show;
}

export const isAdmin = () => {
    if (localStorage.getItem('role') == ROLE_ADMIN)
        return true;
    return false;
}

export const isModerator = () => {
    if (localStorage.getItem('role') == ROLE_MODERATOR)
        return true;
    return false;
}

export const isTrainer = () => {
    if (localStorage.getItem('is_trainer') == 'true')
        return true;
    return false;
}

export const defaultPhoto = (defurlphoto, coverurl) => {
    let urlphoto;
    if(!coverurl || coverurl == "null"){
        urlphoto = HOSTNAME_PORT + defurlphoto;
    } else {
        urlphoto = HOSTNAME_PORT + coverurl
    }
    return urlphoto;
}
