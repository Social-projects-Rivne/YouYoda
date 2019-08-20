import React from 'react';

import {Container} from 'reactstrap';
import {Redirect} from 'react-router-dom';

import {sendDataToDjoser} from '../api/resetPassword'


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
        await sendDataToDjoser(URLPATH, USERDATA)
            .then(() => this.setState({ redirect: true }));
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
