import React from 'react';

import { Button, Col, Modal, Row } from 'reactstrap';
import {Redirect} from 'react-router-dom';

import { FormErrors } from '../api/FormErrors';
import { registration } from '../api/registration';


class Registration extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            confirmpass: '',
            userstudent: true,
            userteacher: false,
            isagreed: true,
            formErrors: {email: '', password: '', confirmpass: '', isAgreed: ''},
            emailValid: false,
            passwordValid: false,
            confirmPasswordValid: false,
            isAgreedValid: true,
            formValid: false,
            showErrors: false,
            redirect: false,
        }
    }

    

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let emailValid = this.state.emailValid;
        let passwordValid = this.state.passwordValid;
        let confirmPasswordValid = this.state.confirmPasswordValid;
        let isAgreedValid = this.state.isAgreedValid;

        switch(fieldName) {
          case 'email':
            emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
            fieldValidationErrors.email = emailValid ? '' : ' is invalid';
            break;
          case 'password':
            passwordValid = value.length >= 6;
            fieldValidationErrors.password = passwordValid ? '': ' is too short';
            var passwordValidSym = false;
            passwordValidSym = value.match(/[0-9a-zA-Z!@#$%^&*]{6,}/g);
            if(!passwordValid && !passwordValidSym)
                fieldValidationErrors.password += passwordValidSym ? '': ' and has not allowed symbols';
            else
                fieldValidationErrors.password += passwordValidSym ? '': ' has not allowed symbols';
            if(passwordValid)
                passwordValid = passwordValidSym;

            if(passwordValid){
                var passConfirm = document.getElementById('confirmpass').value;
                passwordValid = value.length === passConfirm.length;
                fieldValidationErrors.confirmpass = passwordValid ? '': ' and password are different';
            }
            break;
          case 'confirmpass':
            var pass = document.getElementById('password').value;
            passwordValid = pass.length >= 6;
            fieldValidationErrors.password = passwordValid ? '': ' is too short';
            confirmPasswordValid = value.length === pass.length;
            fieldValidationErrors.confirmpass = confirmPasswordValid ? '': ' and password are different';
            break;
          case 'isagreed':
            isAgreedValid = this.state.isagreed;
            fieldValidationErrors.isAgreed = isAgreedValid ? '': ' is not checked';
            break;
          default:
            break;
        }
        this.setState({formErrors: fieldValidationErrors,
                        emailValid: emailValid,
                        passwordValid: passwordValid,
                        confirmPasswordValid: confirmPasswordValid,
                        isAgreedValid: isAgreedValid
                      }, this.validateForm);
    }

    errorShowBlock(formErrors) {
        for (var errorText in formErrors) {
            if(formErrors[errorText].length > 0)
                return true;
        }
        return false;
    }

    validateForm() {
        this.setState({formValid: this.state.emailValid && this.state.passwordValid && this.state.confirmPasswordValid && this.state.isAgreedValid});
        var show = this.errorShowBlock(this.state.formErrors);
        this.setState({
            showErrors: show
        });
    }

    onChangeInputs = (event) => {
        const idParam = event.target.id;
        const valueParam = event.target.value;
        if( idParam === 'isagreed')
            this.setState({[idParam]:!this.state.isagreed},
                          () => { this.validateField(idParam, this.state.isagreed) });
        else
            this.setState({[idParam]:valueParam},
                          () => { this.validateField(idParam, valueParam) });
    }
    radioGetter = (event) => {
        this.setState({
            userteacher:!this.state.userteacher,
            userstudent:!this.state.userstudent
        });
    }
    async handleClick(event){
        event.preventDefault();
        await registration(this.state)
            .then(() => this.setState({ redirect: true }));
        return false;
    }
    render () {
        const { redirect } = this.state;
        if (redirect) {
           return <Redirect to='/activation/send/email'/>;
        }
        return (
        <div>
            <Modal id="registration-form" isOpen={this.props.isOpen} className="wild">
                <div className="modal-body">
                <Row>
                    <Col md="5" className="left-wrap">
                        <Row className="container h-50 mx-0 mb-4">
                            <h1 className="modal-title text-white custom-title">Hello, <span>Dear Friend!</span></h1>
                        </Row>
                        <Row className="container h-auto">
                            <div className="col-sm-12 form-group">
                                <span className="text-title text-white d-block pb-2">If you already have an account</span>
                                <Button className="btn-grey btn" onClick={(event) => {this.props.handleClickReg(); this.props.handleClickLogin();}}>Log in</Button>
                            </div>
                        </Row>
                    </Col>
                    <Col md="7" className="right-wrap">
                        <button onClick={this.props.handleClickReg} type="button" className="close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h3 className="modal-title">Register</h3>
                        <div className={this.state.showErrors ? 'panel-errors errors-show':'panel-errors'}>
                            <FormErrors formErrors={this.state.formErrors} />
                        </div>
                        <form className="form-horizontal">
                            <div className={this.state.formErrors.email ? 'form-group is-error': 'form-group'}>
                                <label htmlFor="email" className="mb-1">Email</label>
                                <input type="email" id="email" name="email" className="form-control"
                                       onChange = {(event) => {this.onChangeInputs(event)}}
                                       required/>
                            </div>
                            <div className={this.state.formErrors.password ? 'form-group is-error': 'form-group'}>
                                <label htmlFor="password" className="mb-1">Password</label>
                                <input type="password" id="password" name="password" className="form-control"
                                       onChange = {(event) => {this.onChangeInputs(event)}}
                                       required/>
                            </div>
                            <div className={this.state.formErrors.confirmpass ? 'form-group is-error': 'form-group'}>
                                <label htmlFor="confirmpass" className="mb-1">Confirm Password</label>
                                <input type="password" id="confirmpass" name="confirmpass" className="form-control"
                                       onChange = {(event) => {this.onChangeInputs(event)}}
                                       required/>
                            </div>
                            <span className="text-title">Profile type</span>
                            <Row className="form-group">
                                <Col md="6" className="form-check col-xs-6">
                                    <input className="form-check-input" type="radio"
                                           name="typeUser" id="userstudent" value="option1"
                                           checked={this.state.userstudent}
                                           onChange={(event) => {this.radioGetter(event)}}/>
                                    <label className="form-check-label" htmlFor="userstudent">I want to develop myself</label>
                                </Col>
                                <Col md="6" className="form-check col-xs-6">
                                    <input className="form-check-input" type="radio"
                                           name="typeUser" id="userteacher" value="option2"
                                           checked={this.state.userteacher}
                                           onChange={(event) => {this.radioGetter(event)}}/>
                                    <label className="form-check-label" htmlFor="userteacher">I'm a teacher/coach</label>
                                </Col>
                            </Row>
                            <div className={this.state.formErrors.isAgreed ? 'form-group is-error': 'form-group'}>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="isagreed"
                                           name="isagreed"
                                           checked={this.state.isagreed}
                                           onChange = {(event) => {this.onChangeInputs(event)}}
                                           required/>
                                    <label className="form-check-label" htmlFor="isagreed">I Accept terms and conditions & privacy policy</label>
                                </div>
                            </div>
                            <Row className="form-group text-right">
                                <Col md="4">
                                    <button type="button" className="btn-grey btn btn-cancel"
                                            onClick={this.props.handleClickReg}>Cancel</button>
                                </Col>
                                <Col md="8">
                                    <button type="submit" className="btn-yellow btn btn-warning"
                                            onClick={(event) => this.handleClick(event)}
                                            disabled={!this.state.formValid}>Sign up</button>
                                </Col>

                            </Row>
                        </form>
                    </Col>
                </Row>

                </div>
        </Modal>
        </div>
        )
    }

}

export default Registration;
