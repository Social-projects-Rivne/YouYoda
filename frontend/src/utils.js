const DEFAULT_AVATAR_URL = "/media/avatar.png",
      HOSTNAME_PORT = "http://localhost:8000",
      ROLE_ADMIN = 3,
      ROLE_MODERATOR = 2;

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

export const defaultPhoto = (defaultPhotoUrl, coverUrl) => {
    let urlphoto;
    if(!coverUrl || coverUrl === ""){
        urlphoto = HOSTNAME_PORT + defaultPhotoUrl;
    } else {
        urlphoto = HOSTNAME_PORT + coverUrl;
    }
    return urlphoto;
}
