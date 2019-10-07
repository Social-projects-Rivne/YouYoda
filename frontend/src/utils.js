const DEFAULT_AVATAR_URL = "/media/avatar.png"
const HOSTNAME_PORT = "http://localhost:8000"
const ROLE_ADMIN = 3
const ROLE_MODERATOR = 2

export { DEFAULT_AVATAR_URL, HOSTNAME_PORT, ROLE_ADMIN, ROLE_MODERATOR }

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
    return parseInt(localStorage.getItem('role')) === ROLE_ADMIN;
}

export const isModerator = () => {
    return parseInt(localStorage.getItem('role')) === ROLE_MODERATOR;
}

export const isTrainer = () => {
    if (localStorage.getItem('is_trainer') === 'true')
        return true;
    return false;
}

export const defaultPhoto = (defaultPhotoUrl, coverUrl) => {
    let urlphoto;
    if(!coverUrl || coverUrl === ""){
        urlphoto = HOSTNAME_PORT + defaultPhotoUrl;
    } else {
        urlphoto = HOSTNAME_PORT + coverUrl;
    }
    return urlphoto;
}
