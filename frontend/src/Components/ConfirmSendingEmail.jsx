import React from 'react';

import {Container} from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export default class ResetPassword extends React.Component{
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
