
export const isAuthenticated = (dosmth) => {
    let show = "auth-display-none";
    if (localStorage.getItem('token')){
        if (dosmth == "show"){
            show = ""
        }
    } else {
        if (dosmth == "hide"){
            show = ""
        }
    }
    return show;
}
