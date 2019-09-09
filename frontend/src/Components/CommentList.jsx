import React from 'react';

import { Container, Row, Button, Col } from 'reactstrap';
import { toast } from 'react-toastify';

import Comment from "./Comment";
import { defaultPhoto, isAuthenticated } from '../utils';


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
        name: "",
        message: ""
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


  onSubmit = (e) => {

    e.preventDefault();

    if (!this.isFormValid()) {
      this.setState({ error: "All fields are required." });
      return;
    }

    // persist the comments on server
    let { comment } = this.state;
    fetch("http://localhost:7777", {
      method: "post",
      body: JSON.stringify(comment)
    })
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          this.setState({ loading: false, error: res.error });
        } else {
          // add time return from api and push comment to parent state
          comment.time = res.time;
          this.props.addComment(comment);

          // clear the message box
          this.setState({
            loading: false,
            comment: { ...comment, message: "" }
          });
        }
      })
      .catch(err => {
        this.setState({
          error: "Something went wrong while submitting form.",
          loading: false
        });
      });
  }

  isFormValid = () => {
    return this.state.comment.name !== "" && this.state.comment.message !== "";
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
              value={this.state.comment.name}
              className="form-control"
              placeholder="😎 Your Name"
              name="name"
              type="text"
            />
          </div>

          <div className="form-group">
            <textarea
              onChange={this.handleFieldChange}
              value={this.state.comment.message}
              className="form-control"
              placeholder="🤬 Your Comment"
              name="message"
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
