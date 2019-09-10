import React from 'react'

import { defaultPhoto } from '../utils';


const DEFAULT_AVATAR_PATH = "/media/avatar.png";

export default class Avatar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let alt_avatar = defaultPhoto(DEFAULT_AVATAR_PATH, this.props.avatar_url)
        return (
            <div>
                <img className="avatar"
                     src={alt_avatar}
                     alt="profile-photo"
                />
            </div>
        )
    }
}
