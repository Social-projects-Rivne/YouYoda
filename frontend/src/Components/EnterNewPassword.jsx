import React from 'react';

import {Container} from 'reactstrap';
import {newPassword} from '../api/resetPassword';

export default class EnterNewPassword extends React.Component{
    constructor(props){
    	super(props);

    	this.state={new_password:'',
                    re_new_password:''};
	}

    handlChangePassword = (event) => {
        this.setState({new_password: event.target.value});
    }

    handlChangeRePass = (event) => {
        this.setState({re_new_password: event.target.value});
    }

    handleNewPassword = (event) => {
		 const userdata={"uid":this.props.match.params.uid,
            "token":this.props.match.params.token,
            "new_password":this.state.new_password,
            "re_new_password":this.state.re_new_password
            }
        newPassword(userdata);
	}

  render () {
    return (
      <div className="reset-pass">
        <Container style={{width:"500px"}}>
        <h1>Forgot your password?</h1>
        <p>Enter your email address below, and we'll email instructions for setting a new one.</p>

        <form method="POST" className="form-group">
					<input type="password"
							className="form-control reset-pass-form"
							placeholder="Enter New Password"
                            value={this.state.new_password}
							onChange = {this.handlChangePassword}
							required/>
                    <input type="password"
							className="form-control reset-pass-form"
							placeholder="Retype New Password"
                            value={this.state.re_new_password}
							onChange = {this.handlChangeRePass}
							required/>
					<input type="submit"
							value="Change password"
							className="btn btn-warning reset-pass-form"
							onClick={this.handleNewPassword}/>
        </form>
        </Container>
      </div>
      )
  }
}
