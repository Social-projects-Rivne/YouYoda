import React from 'react';

import {Container} from 'reactstrap';

import {resetPassword} from '../api/resetPassword'


export default class ResetPassword extends React.Component{
    constructor(props){
    	super(props);

    	this.state={email:''};
	}

    handlChangeEmail = (event) => {
        this.setState({email: event.target.value});
    }

    handlPasswordReset = (event) => {
		 const userdata={"email":this.state.email}
         resetPassword(userdata);
	}

    render () {
    return (
      <div className="reset-pass">
        <Container style={{width:"500px"}}>
        <h1>Forgot your password?</h1>
        <p>Enter your email address below, and we'll email instructions for setting a new one.</p>

        <form method="POST" className="form-group ">
    				<input type="email"
    						className="form-control reset-pass-form "
    						placeholder="Enter Email"
                            value={this.state.email}
                            onChange = {this.handlChangeEmail}
    						required/>
    				<button className="btn btn-warning reset-pass-form"
    						eventHandler={this.handlPasswordReset}>"Send me instructions!"
                            </button>
        </form>
        </Container>
      </div>
      )
    }
}
