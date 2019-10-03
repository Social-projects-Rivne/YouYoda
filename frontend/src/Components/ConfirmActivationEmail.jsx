import React from 'react';

import ClipLoader from 'react-spinners/ClipLoader';
import { Container } from 'reactstrap';
import { css } from '@emotion/core';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';

import { axiosPost } from '../api/axiosPost'

const UIDPOS = 3;
const TOKENPOS = 4;
const override = css`
    display: block;
    margin: 0 auto;
    border-color: #FFD466;
`;

export default class ResetPassword extends React.Component{
    constructor(props){
    	super(props);

    	this.state={
            redirect: false,
            loading: false
        };
	}


    extractToken (idx) {
        return window.location.pathname.split("/")[idx]
    }

    handleSubmitActivation = async (event) => {
        console.log(this.props)
        const URLPATH = 'auth/users/activation/';
        const USERDATA={
            "uid": this.extractToken(UIDPOS),
            "token": this.extractToken(TOKENPOS),
            }
        this.setState({ loading:true })
            try {
                await axiosPost(URLPATH, USERDATA);
                this.setState({ redirect: true });
                toast.success('Thank you, now you can Sign In');
            } catch (error){
                toast.error('Activation was failed. Please, contact administrator or support system ;)');
                console.log(error.message)
            }
    }
    render () {
        const { redirect } = this.state;
        if (redirect) {
           return <Redirect to='/'/>;
        }
    return (
      <div className="reset-pass">
        <Container style={{width:"600px"}} className="confirm">
        <h3>Push, if You want activate your account:</h3>
        <div className="d-flex justify-content-center">
        <div className='sweet-loading'>
            <ClipLoader
              css={override}
              sizeUnit={"px"}
              size={40}
              color={'#123abc'}
              loading={this.state.loading}
            />
          </div>
        <button type="button"
                className="btn btn-warning reset-pass-form"
                onClick={this.handleSubmitActivation}>
                Activate
                </button>
                <div className='sweet-loading'>
                    <ClipLoader
                      css={override}
                      sizeUnit={"px"}
                      size={40}
                      color={'#123abc'}
                      loading={this.state.loading}
                    />
                  </div>
                  </div>

        </Container>
      </div>
      )
    }
}
