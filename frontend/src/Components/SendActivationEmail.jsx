import React from 'react';

import {Container} from 'reactstrap';

import {newPassword} from '../api/resetPassword'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export default class ResetPassword extends React.Component{
    render () {
    return (
      <div className="reset-pass">
        <Container style={{width:"500px"}} className="confirm">
        <h1><FontAwesomeIcon icon="paper-plane"/></h1>
        <p>Email whith activation confirmation has been sent to your email.</p>
        <p>If you didn't receive the email, check Spam or
            <button type="button"
                    className="btn btn-warning re-send"
                    onClick={this.handleSubmitActivation}>
                    ReSend activation
            </button>
        </p>
        </Container>
      </div>
      )
    }
}
