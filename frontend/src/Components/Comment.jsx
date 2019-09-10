import React from 'react';

import moment from 'moment';


export default function Comment(props) {
  const { author, comment, date } = props.comment;
  let courseDate = date;
  let newCourseDate = moment(courseDate).format('MMMM Do YYYY, h:mm:ss a');
  return (
    <div className="media mb-3">
      <img
        className="mr-3 bg-light rounded"
        width="48"
        height="48"
        src={`https://api.adorable.io/avatars/48/${author.toLowerCase()}@adorable.io.png`}
        alt={author}
      />

      <div className="media-body p-2 shadow-sm rounded bg-light border">
        <small className="float-right text-muted">{newCourseDate}</small>
        <h6 className="mt-0 mb-1 text-muted">{author}</h6>
        {comment}
      </div>
    </div>
  );
}
