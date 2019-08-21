export function extractToken (idx) {
    return window.location.pathname.split("/")[idx]
}

export const verifyAuth = () => {
    if(localStorage.getItem('token')){
        if(!this.state.authVisible){
            this.setState({authVisible: "auth-display-none"})
            return this.state.authVisible;
        } else {
            return this.state.authVisible;
        }
    } else {
        this.setState({authVisible: ""})
        return this.state.authVisible;
    }
}
