import React from 'react';

import {Container} from 'reactstrap';
import {newPassword} from '../api/resetPassword';
import {FormErrors} from '../api/FormError';


export default class EnterNewPassword extends React.Component{
    constructor(props){
    	super(props);

    	this.state={new_password:'',
                    re_new_password:'',
                    formErrors: {re_new_password: '', new_password: ''},
                    rePasswordValid: false,
                    passwordValid: false,
                    formValid: false
                };
	}

    handlChangePassword = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value},
                        () => { this.validateField(name, value) }
                    );
        console.log(this.state);
    }

    validateField(fieldName, value) {
          let fieldValidationErrors = this.state.formErrors;
          let {passwordValid, rePasswordValid} = this.state;
          let {new_password, re_new_password} = this.state;

          passwordValid = value.length >= 6;
          fieldValidationErrors.fieldName = passwordValid ? '': ' is too short';
          (new_password !== re_new_password) ?
              fieldValidationErrors.fieldName= "Passwords don't match" :
              rePasswordValid = true;

          this.setState({formErrors: fieldValidationErrors,
                        passwordValid: passwordValid,
                        rePasswordValid: rePasswordValid,
                        }, this.validateForm);
    }
    validateForm() {
      this.setState({formValid: this.state.rePasswordValid &&
                                this.state.passwordValid});
    }

    handleSubmitNewPassword = (event) => {
        const userdata={
            "uid":this.props.match.params.uid,
            "token":this.props.match.params.token,
            "new_password":this.state.new_password
            }
        newPassword(userdata);
    }

  render () {
    return (
      <div className="reset-pass">
        <Container style={{width:"500px"}}>
        <h1>Forgot your password?</h1>
        <p>Enter your new password:</p>

        <div className="form-error">
             <FormErrors formErrors={this.state.formErrors} />
        </div>

        <form method="POST" className="form-group">
					<input type="password"
                            name="new_password"
                            className="form-control reset-pass-form"
							placeholder="Enter New Password"
                            value={this.state.new_password}
							onChange = {this.handlChangePassword}
							required/>
                    <input type="password"
                            name="re_new_password"
							className="form-control reset-pass-form"
							placeholder="Retype New Password"
                            value={this.state.re_new_password}
							onChange = {this.handlChangePassword}
							required/>
					<input type="submit"
							value="Change password"
							className="btn btn-warning reset-pass-form"
							onClick={this.handleNewPassword}
                            disabled={!this.state.formValid}/>
        </form>
        </Container>
      </div>
      )
  }
}
