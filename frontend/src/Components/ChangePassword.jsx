import React from 'react';

import {FormErrors} from '../api/FormError';
import {API} from '../api/axiosConf';
import {toast} from "react-toastify";


export default class ChangePassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            new_password: '',
            re_new_password: '',
            formErrors: {re_new_password: '', new_password: ''},
            rePasswordValid: false,
            passwordValid: false,
            formValid: false,
        };
    }

    handleChangePassword = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        this.setState({[name]: value},
            () => {
                this.validateField(name, value)
            }
        );
        console.log(this.state);
    };

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let {passwordValid, rePasswordValid, new_password, re_new_password} = this.state;
        let passregex = RegExp(/^(\w+){6,80}$/g);

        passwordValid = passregex.test(value);
        fieldValidationErrors.fieldName = passwordValid ? '' : 'Password must to contain 6-80 characters';
        (new_password !== re_new_password) ?
            fieldValidationErrors.fieldName = "Passwords don't match" :
            rePasswordValid = true;

        this.setState({
            formErrors: fieldValidationErrors,
            passwordValid: passwordValid,
            rePasswordValid: rePasswordValid,
        }, this.validateForm);
    };

    validateForm() {
        this.setState({
            formValid: this.state.rePasswordValid &&
                this.state.passwordValid
        });
    };

    changePassword = async () => {
        try {
            const data = {email: this.props.email, password: this.state.new_password}
            await API.put('user/profile/change_password', data);
            toast.success('Password changed!');
        } catch (error) {
            console.error(error);
        }
    };

    render() {
        return (
            <div className="justify-content-sm-end" style={{marginTop: "15px"}}>
                <div className="form-error">
                    <FormErrors formErrors={this.state.formErrors}/>
                </div>

                <input type="password"
                       name="new_password"
                       className="form-control reset-pass-form input-for-password"
                       placeholder="Enter New Password"
                       value={this.state.new_password}
                       onChange={this.handleChangePassword}
                       required/>
                <input type="password"
                       name="re_new_password"
                       className="form-control reset-pass-form input-for-password"
                       placeholder="Retype New Password"
                       value={this.state.re_new_password}
                       onChange={this.handleChangePassword}
                       required/>
                <button type="button"
                        className="btn btn-warning reset-pass-form"
                        onClick={this.changePassword}
                        disabled={!this.state.formValid}>Change password
                </button>
            </div>
        )
    }
}

