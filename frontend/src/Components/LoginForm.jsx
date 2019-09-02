import React, { Component } from 'react';
import { Col, Form, FormGroup, Label, Input, Button, Row, Modal } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';

import FacebookLogo from '../img/content/facebook.png';
import { FormErrors } from '../api/FormErrors';
import GoogleLogo from '../img/content/google.png';
import { userLogin } from '../api/userLogin';


class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            formErrors: { email: '', password: '' },
            emailValid: false,
            passwordValid: false,
            formValid: false,
            redirect: false,
			showErrors: false
        };

        this.handleClick = this.handleClick.bind(this);
        this.handleUserInput = this.handleUserInput.bind(this);
    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let emailValid = this.state.emailValid;
        let passwordValid = this.state.passwordValid;

        switch (fieldName) {
            case 'email':
                emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                fieldValidationErrors.email = emailValid ? '' : ' is invalid';
                break;
            case 'password':
                passwordValid = value.length >= 6;
                fieldValidationErrors.password = passwordValid ? '' : ' is too short';
                break;
            default:
                break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            emailValid: emailValid,
            passwordValid: passwordValid
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
        this.setState({
            formValid: this.state.emailValid &&
                       this.state.passwordValid
		});
		var show = this.errorShowBlock(this.state.formErrors);
        this.setState({
            showErrors: show
        });
    }

    handleUserInput(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
                [name]: value },
            () => { this.validateField(name, value) });
    }

    async handleClick(event) {
    	event.preventDefault();
        try {
            await userLogin(this.state)
                toast.success('Login successfull');
                this.setState({ redirect: true });
       } catch (error){
           toast.error('Please, check entered email and password. Contact administrator or support system.');
       }

    }

    render() {
    	const { redirect } = this.state;
        if (redirect) {
           return <Redirect to='/profile'/>;
        }
        return (
            <div>
			  <Modal id="login-form" isOpen={this.props.isOpenL} className="wild">
			  <div className="modal-body">
			    <button
			    type="button"
			    className="close"
			    onClick={this.props.handleClickLogin}>
                    <span aria-hidden="true">&times;</span>
                </button>
			<Row className="login-row">
			  <Col md="7" className="login">
			      <Form className="form-horizontal">
				    <Row className="m-0">
				      <Col>
						<h3 className="modal-title mb-3">Sign In</h3>
						<div className={this.state.showErrors ? 'panel-errors errors-show':'panel-errors'}>
                            <FormErrors formErrors={this.state.formErrors} />
                        </div>
					    <FormGroup className={this.state.formErrors.email ? 'is-error': ''}>
						  <Label for="email" className="mb-1">
						  <FontAwesomeIcon icon="envelope" size="sm"/> Email</Label>
						  <Input
						     type="email"
						     name="email"
						     id="email"
						     placeholder="myemail@email.com"
						     required
						     onChange = {(event) => {this.handleUserInput(event)}}/>
					    </FormGroup>
					    <FormGroup className={this.state.formErrors.password ? 'is-error': ''}>
						  <Label for="password" className="mb-1">
						  <FontAwesomeIcon icon="key" size="sm"/> Password</Label>
						  <Input
						     type="password"
						     name="password"
						     id="password"
						     placeholder="********"
						     required
						     onChange = {(event) => {this.handleUserInput(event)}}/>
					    </FormGroup>
				      </Col>
				    </Row>
				    <Row className="m-0">
					  <Col>
					    <FormGroup check className="hidden">
						  <Input type="checkbox" name="check" id="exampleCheck"/>
						  <Label for="exampleCheck" check>Remember me</Label>
					    </FormGroup>
					  </Col>
					  <Col className="text-right">
					    <Link to="/reset/password">	Fogot password?</Link>
					  </Col>
				    </Row>
				    <Row className="m-0">
				      <Col className="mt-4 text-right">
				        <Button
				          type="submit"
				          className="btn-yellow btn btn-warning "
				          onClick={(event) => this.handleClick(event)}
				          disabled={!this.state.formValid}>Sign in</Button>
				      </Col>
				    </Row>
				  </Form>
				    <Row className="m-0 mt-4 mb-4">
				      <Col xs="3">
				        <p>Log in with:</p>
				      </Col>
				      <Col xs="2">
				        <a href="#"><img src={FacebookLogo} width="40" alt="FacebookLogo"/></a>
				      </Col>
				      <Col xs="2">
				        <a href="#"><img src={GoogleLogo} width="40" alt="GoogleLogo"/></a>
				      </Col>
				    </Row>
			  </Col>
			  <Col md="5" className="signup">
			  	<Row className="container h-auto mx-0 mb-4">
					<h1 className="modal-title text-white custom-title">Hello, <span>Dear Friend!</span></h1>
                </Row>
				<Row className="container mx-0 mb-4">
					<h2 className="text-white">You will find here what you are looking for</h2>
				</Row>
				<Row className="container h-auto">
					<div className="col-sm-12 form-group">
						<p className="text-title text-white d-block pb-2">If you don’t have an account yet</p>
						<Button
						  type="button"
						  className="btn-grey btn btn-color-w"
						  onClick={() => {this.props.handleClickLogin(); this.props.handleClickReg();}}>Sign up</Button>
						<br></br><br></br>
						<Button
						  type="button"
						  className="btn-red btn btn-color-w" color="danger"
						  onClick={this.props.handleClickLogin}>Cancel</Button>
					</div>
                </Row>
			  </Col>
			</Row>
		</div>
		</Modal>
		</div>
        );
    }
}

export default LoginForm;
