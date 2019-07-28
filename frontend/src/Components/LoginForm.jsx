import React, { Component } from 'react';
import {
  Container, Col, Form,
  FormGroup, Label, Input,
  Button, Row
} from 'reactstrap';
import FacebookLogo from '../imgnotignor/Facebook(1).png';
import GoogleLogo from '../imgnotignor/Google +.png';
import '../style/login.css';


class LoginForm extends Component {
    render() {
        return (
		  <Container>
			<Row>
			  <Col md="6">
			    <section className="Login">
			      <Form className="form" action="#" method="post">
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
						  />
					    </FormGroup>
					    <FormGroup>
						  <Label for="examplePassword">Password</Label>
						  <Input
						type="password"
						name="password"
						id="examplePassword"
						placeholder="********"
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
				        <Button className="SignInButton">Sign in</Button>
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
// so...

export default LoginForm;
