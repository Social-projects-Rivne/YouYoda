import React from 'react';

import {Container} from 'reactstrap';

import {newPassword} from '../api/resetPassword'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export default class ResetPassword extends React.Component{
    constructor(props){
    	super(props);

    	this.state={email:''};
	}

    handlChangeEmail = (event) => {
        this.setState({email: event.target.value});
    }

    handlPasswordReset = async (event) => {
        const URLPATH = 'auth/users/reset_password/';
        const USERDATA = {"email":this.state.email}
        await newPassword(URLPATH, USERDATA);
        
	}

    render () {
    return (
      <div className="reset-pass">
        <Container style={{width:"500px"}} className="confirm">
        <h1><FontAwesomeIcon icon="paper-plane"/></h1>
        <p>Email whith password confirmation has been sent to your email.</p>
        </Container>
      </div>
      )
    }
}
