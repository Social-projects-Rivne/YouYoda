import React from 'react'

const avatarpath = "http://localhost:8000";

export default class Avatar extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            avatar_url: avatarpath + localStorage.getItem('avatar')
        }
    }

    render() {
        return (
            <div>
            <img className="avatar"
                 src={avatarpath + this.props.avatar_url}
                 alt="profile-photo"
            />
            </div>
        )
    }
}