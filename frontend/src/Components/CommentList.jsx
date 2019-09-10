import React from 'react';

import { toast } from 'react-toastify';

import { API } from '../api/axiosConf';
import Comment from "./Comment";
import { defaultPhoto, isAuthenticated } from '../utils';
import { css } from '@emotion/core';
import ClipLoader from 'react-spinners/ClipLoader';


const override = css`
    display: block;
    margin: 0 auto;
    border-color: #FFD466;
`;

export class CommentList extends React.Component {
  constructor(props) {
    super(props);
  }
  render(){
      return (
        <div className="commentList">
          <h5 className="text-muted mb-4">
            <span className="badge badge-success">{this.props.comments.length}</span>{" "}
            Comment{this.props.comments.length > 0 ? "s" : ""}
          </h5>
          {this.props.comments.length === 0 ? (
            <div className="alert text-center alert-info">
              Nobody leaved comments still
            </div>
          ) : null}

              <div className='sweet-loading'>
                  <ClipLoader
                    css={override}
                    sizeUnit={"px"}
                    size={150}
                    color={'#123abc'}
                    loading={this.props.loading}
                  />
                </div>


          {this.props.comments.map((comment, index) => (
            <Comment key={index} comment={comment} />
          ))}
        </div>
      );
    }
}


export class CommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: "",
      comment: {
        course: this.props.course,
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
    return this.state.comment.comment !== "";
  }

  renderError() {
    return this.state.error ? (toast.error(this.state.error)) : null;
  }

  render() {
      let defimg = "/media/avatar.png";
      let coverimg = defaultPhoto(defimg, localStorage.getItem("avatar_url"));
    return (
      <>
        <form method="post" onSubmit={this.onSubmit}>
          <div className="form-group">
            <img src={coverimg} alt="avatar" style={{width:"45px"}}/>
          </div>

          <div className="form-group">
            <textarea
              onChange={this.handleFieldChange}
              value={this.state.comment.comment}
              className="form-control"
              placeholder="Your Comment"
              name="comment"
              rows="5"
            />
          </div>
          {this.renderError()}
          <div className="form-group">
            <button className="btn btn-warning">
              Comment ➤
            </button>
          </div>
        </form>
      </>
    );
  }
}
