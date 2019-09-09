import React from 'react';

import { toast } from 'react-toastify';

import Comment from "./Comment";
import { defaultPhoto, isAuthenticated } from '../utils';
import { API } from '../api/axiosConf';


export function CommentList(props) {
  return (
    <div className="commentList">
      <h5 className="text-muted mb-4">
        <span className="badge badge-success">{props.comments.length}</span>{" "}
        Comment{props.comments.length > 0 ? "s" : ""}
      </h5>

      {props.comments.length === 0 ? (
        <div className="alert text-center alert-info">
          Be the first to comment
        </div>
      ) : null}

      {props.comments.map((comment, index) => (
        <Comment key={index} comment={comment} />
      ))}
    </div>
  );
}


export class CommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

      error: "",

      comment: {
        course: this.props.course,
        author: "",
        comment: ""
      }
    };
  }


  handleFieldChange = event => {
    const { value, name } = event.target;

    this.setState({
      ...this.state,
      comment: {
        ...this.state.comment,
        [name]: value
      }
    });
  };


  onSubmit = async(e) => {

    e.preventDefault();

    if (!this.isFormValid()) {
      this.setState({ error: "All fields are required." });
      return;
    }
    let { comment } = this.state;
    try {
      let response = await API.post('/courses/comments', {
            course: this.state.comment.course,
            author: this.state.comment.author,
            comment: this.state.comment.comment
        },
      )
      this.props.addComment(comment);
      this.setState({
            comment: { ...comment, comment: "" }
          });
    }
    catch (error) {
      toast.error(error.message)
    }
    
  }

  isFormValid = () => {
    return this.state.comment.author !== "" && this.state.comment.comment !== "";
  }

  renderError() {
    return this.state.error ? (toast.error(this.state.error)) : null;
  }

  render() {
    return (
      <>
        <form method="post" onSubmit={this.onSubmit}>
          <div className="form-group">
            <input
              onChange={this.handleFieldChange}
              value={this.state.comment.author}
              classauthor="form-control"
              placeholder="😎 Your Name"
              name="author"
              type="text"
            />
          </div>

          <div className="form-group">
            <textarea
              onChange={this.handleFieldChange}
              value={this.state.comment.comment}
              className="form-control"
              placeholder="🤬 Your Comment"
              name="comment"
              rows="5"
            />
          </div>

          {this.renderError()}

          <div className="form-group">
            <button className="btn btn-primary">
              Comment ➤
            </button>
          </div>
        </form>
      </>
    );
  }
}
