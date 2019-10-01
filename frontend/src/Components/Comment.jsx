import React from 'react';

import moment from 'moment';

import { defaultPhoto } from '../utils';


export default function Comment(props) {
  const { author, comment, date } = props.comment;
  let username = `${author.first_name} ${author.last_name}`
  let commentDate = date;
  let newDate = moment(commentDate).format('MM Do YY, h:mm:ss a');
  let defimg = "/media/avatar.png";
  let coverimg = defaultPhoto(defimg, author.avatar_url);
  return (
    <div className="media mb-3 comment">
      <img
        className="mr-3 bg-light rounded"
        width="48"
        height="48"
        src={coverimg}
        alt={username}

      />

      <div className="media-body p-2 shadow-sm rounded bg-light border">
        <small className="float-right text-muted">{newDate}</small>
        <h6 className="mt-0 mb-1 text-muted">{username}</h6>
        {comment}
      </div>
    </div>
  );
}
