import React, { Component } from 'react';
import {
  Container, Col, Form,
  FormGroup, Label, Input,
  Button, Row, Modal
} from 'reactstrap';
// import { Redirect } from 'react-router'
// import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import FacebookLogo from '../img/content/Facebook(1).png';
import GoogleLogo from '../img/content/Google +.png';
import '../style/login.css';


class LoginForm extends Component {
    constructor(props){
    	super(props);

    	this.state={
    		email:'',
  			password:'',
  		};
  }
  
  	handleClick(event){
		 var apiBaseUrl = "http://localhost:8000/api/";
		 // var self = this;
		 var userdata={
		 "email":this.state.username,
		 "password":this.state.password
		 }
		 axios.post(apiBaseUrl+'login', userdata)
		 .then(function (response) {
		 console.log(response);
		 if(response.data.code === 200){
		 console.log("Login successfull");
		 //this.props.history.push('/');
		 window.location.href = "/";
		 }
		 else if(response.data.code === 204){
		 console.log("Username password do not match");
		 alert("username password do not match")
		 }
		 else{
		 console.log("Username does not exists");
		 alert("Username does not exist");
		 }
		 })
		 .catch(function (error) {
		 console.log(error);
		 });
		 }
    render() {
        return (
		  <Container>
			<Row>
			  <Col md="6">
			    <section className="Login">
			      <Form>
				    <Row>
				      <Col>
				        <h2>Log In<br></br><br></br></h2>
					    <FormGroup>
						  <Label>Email</Label>
						  <Input
						type="email"
						name="email"
						id="exampleEmail"
						placeholder="myemail@email.com"
						onChange = {(event,newValue) => this.setState({email:newValue})}
						  />
					    </FormGroup>
					    <FormGroup>
						  <Label for="examplePassword">Password</Label>
						  <Input
						type="password"
						name="password"
						id="examplePassword"
						placeholder="********"
						onChange = {(event,newValue) => this.setState({password:newValue})}
						/>
					    </FormGroup>	
				      </Col>
				    </Row>
				    <Row>
					  <Col>
					    <FormGroup check>
						  <Input type="checkbox" name="check" id="exampleCheck"/>
						  <Label for="exampleCheck" check>Remember me</Label>
					    </FormGroup>
					  </Col>
					  <Col></Col>
					  <Col>
					    <a href="dog.html">Fogot password?</a>
					  </Col>
				    </Row>
				    <Row>
				      <Col>
				        <br></br>
				        <Button className="SignInButton" onClick={(event) => this.handleClick(event)}>Sign in</Button>
				      </Col>
				    </Row>
				  </Form>
				  <br></br><br></br>
				    <Row>
				      <Col xs="3">
				        <p>Sign in with:</p>
				      </Col>
				      <Col xs="1">
				        <a href="#"><img src={FacebookLogo} width="40" alt="FacebookLogo"/></a>
				      </Col>
				      <Col xs="1"></Col>
				      <Col xs="1">
				        <a href="#"><img src={GoogleLogo} width="40" alt="GoogleLogo"/></a>
				      </Col>
				     </Row>
			    </section>
			  </Col>
			  <Col md="6">
			    <section className="SignUp">
			      <h1>Hello,<br></br>Dear Friend</h1>
			      <br></br>
			      <p className="SignUpText">Blah blah blah</p>
			      <p className="SignUpInvite">If you don’t have an account yet</p>
			      <Button className="SignUpButton">Sign up</Button>
			    </section>
			  </Col> 
			</Row>
		  </Container>
        );
    }
}

export default LoginForm;
