import React, { Component } from 'react';
import { Col, Form, FormGroup, Label, Input, Button, Row, Modal } from 'reactstrap';

import FacebookLogo from '../img/content/Facebook(1).png';
import GoogleLogo from '../img/content/Google +.png';
import { userLogin } from '../api/userLogin';
import '../style/login.css';


class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };

    this.handleClick = this.handleClick.bind(this)
    }

    handleClick(event) {
            userLogin(this.state);
    }

    render() {
    return (
        <div>
			  <Modal id="login-form" isOpen={this.props.isOpenL} className="wild">
			  <div className="modal-body">
			    <button onClick={this.props.handleClickLogin} type="button" className="close">
                            <span aria-hidden="true">&times;</span>
                        </button>
			<Row>
			  <Col md="7" className="login">
			      <Form className="form-horizontal">
				    <Row className="m-0">
				      <Col>
						<h3 className="modal-title mb-3">Log In</h3>
					    <FormGroup>
						  <Label for="email" className="mb-1">Email</Label>
						  <Input
						type="email"
						name="email"
						id="email"
						placeholder="myemail@email.com"
						required
						onChange = {(event,newValue) => this.setState({email:newValue})}
						  />
					    </FormGroup>
					    <FormGroup>
						  <Label for="password" className="mb-1">Password</Label>
						  <Input
						type="password"
						name="password"
						id="password"
						placeholder="********"
						required
						onChange = {(event,newValue) => this.setState({password:newValue})}
						/>
					    </FormGroup>	
				      </Col>
				    </Row>
				    <Row className="m-0">
					  <Col>
					    <FormGroup check>
						  <Input type="checkbox" name="check" id="exampleCheck"/>
						  <Label for="exampleCheck" check>Remember me</Label>
					    </FormGroup>
					  </Col>
					  <Col className="text-right">
					    <a href="dog.html">Fogot password?</a>
					  </Col>
				    </Row>
				    <Row className="m-0">
				      <Col className="mt-4 text-right">
				        <Button type="submit" className="btn-yellow btn btn-warning" onClick={(event) => this.handleClick(event)}>Log in</Button>
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
					<h2 className="text-white">blah blah blah</h2>
				</Row>
				<Row className="container h-auto">
					<div className="col-sm-12 form-group">
						<p className="text-title text-white d-block pb-2">If you don’t have an account yet</p>
						<Button type="button" className="btn-grey btn">Sign up</Button>
						<br></br><br></br>
						<Button onClick={this.props.handleClickLogin} type="button" color="danger" className="btn-red btn">Cancel</Button>
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