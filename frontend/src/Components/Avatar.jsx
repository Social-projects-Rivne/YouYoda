import React from 'react'

import { defaultPhoto } from '../utils';


const DEFAULT_AVATAR_PATH = "/media/avatar.png";

export default class Avatar extends React.Component {
    render() {
        let alt_avatar = defaultPhoto(DEFAULT_AVATAR_PATH, this.props.avatar_url)
        return (
            <div className="avatar">
                <img
                     src={alt_avatar}
                     alt="profile userphoto"
                />
            </div>
        )
    }
}
