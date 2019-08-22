import React from 'react';

import { Container } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';


import {axiosPost} from '../api/axiosPost'


export default class ResetPassword extends React.Component{
    constructor(props){
    	super(props);

    	this.state={email:'',
                    redirect: false,};
	}

    handlChangeEmail = (event) => {
        this.setState({email: event.target.value});
    }

    handlPasswordReset = async (event) => {
        const URLPATH = 'auth/users/reset_password/';
        const USERDATA = {"email":this.state.email}
        try {
            await axiosPost(URLPATH, USERDATA);
            this.setState({ redirect: true });
            toast.success('Email was sended');
        } catch (error){
            toast.error('Please, check entered email. Contact administrator or support system ;)');
            console.log(error.message)
        }
	}

    render () {
        const { redirect } = this.state;
        if (redirect) {
           return <Redirect to='/reset/password/confirm'/>;
        }
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
    						required
                    />
    				<button type="button"
                            className="btn btn-warning reset-pass-form"
    						onClick={this.handlPasswordReset}>Send me instructions!
                    </button>
        </form>
        </Container>
      </div>
      )
    }
}
