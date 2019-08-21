import React from 'react';

import {Container} from 'reactstrap';

import {sendDataToDjoser} from '../api/axiosPost'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export default class ResetPassword extends React.Component{
  constructor(props){
    super(props);

    this.state={email:'',
                  redirect: false,};
}

  handlChangeEmail = (event) => {
      this.setState({email: event.target.value});
  }

  handleSubmitReSendActivation = async (event) => {
        const URLPATH = 'auth/users/resend_activation/';
        const USERDATA = {"email":this.state.email}
        await sendDataToDjoser(URLPATH, USERDATA);
  }
    render () {
    return (
      <div className="reset-pass">
        <Container style={{width:"500px"}} className="confirm">
        <h1><FontAwesomeIcon icon="paper-plane"/></h1>
        <p>Email whith activation confirmation has been sent to your email.</p>
        <p>If you didn't receive the email, check Spam or
          
            
        </p>
        <form method="POST" className="form-group ">
    				<input type="email"
    						className="form-control reset-pass-form "
    						placeholder="Enter Email"
                            value={this.state.email}
                            onChange = {this.handlChangeEmail}
    						required/>
            <button type="button"
                    className="btn btn-warning re-send"
                    onClick={this.handleSubmitReSendActivation}>
                    ReSend activation
            </button>
          </form>
        </Container>
      </div>
      )
    }
}
