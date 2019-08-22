import React from 'react';

import {Container} from 'reactstrap';
import {Redirect} from 'react-router-dom';
import { toast } from 'react-toastify';


import {axiosPost} from '../api/axiosPost'


const UIDPOS = 3;
const TOKENPOS = 4;

export default class ResetPassword extends React.Component{
    constructor(props){
    	super(props);

    	this.state={ redirect: false, };
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
            try {
                await axiosPost(URLPATH, USERDATA);
                this.setState({ redirect: true });
                toast.success('Thank you, now can Sign In');
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
        <button type="button"
                className="btn btn-warning reset-pass-form"
                onClick={this.handleSubmitActivation}>Activate</button>
        </Container>
      </div>
      )
    }
}
