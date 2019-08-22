
export const isAuthenticated = (dosmth) => {
    let show = "auth-display-none";
    if (localStorage.getItem('token')){
        if (dosmth == "show"){
            show = ""
            return show;
        }
        else if (dosmth == "hide"){
            return show;
        }
    } else {
        if (dosmth == "show"){
            return show;
        }
        else if (dosmth == "hide"){
            show = ""
            return show;
        }
    }

    return show;
}
