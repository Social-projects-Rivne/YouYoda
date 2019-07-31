import React from 'react';
import {Container, Row, Col} from 'reactstrap';

export default class ResetPassword extends React.Component{
  render () {
    return (
      <div style={{width:"500px"}}>
        <Container>
        <h1>Forgot your password?</h1>
        <p>Enter your email address below, and we'll email instructions for setting a new one.</p>

        <form method="POST" className="form-group">
          <input type="email" className="form-control" style={{borderRadius:"20px"}} placeholder="Enter Email" required/>
          <input type="submit" value="Send me instructions!" className="btn btn-warning" style={{marginTop:"15px", borderRadius:"20px"}}/>
        </form>
        </Container>
      </div>
      )
  }
}

