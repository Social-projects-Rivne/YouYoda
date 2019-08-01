import React from 'react';
import axios from 'axios';
import {Container} from 'reactstrap';

export default class ResetPassword extends React.Component{
    constructor(props){
    	super(props);

    	this.state={email:''};
	}
    handleClick(event){
		 let apiBaseUrl = "http://localhost:8000/api/";
		 let userdata={"email":this.state.email}

		 axios.post(apiBaseUrl+'passrecovery', userdata)
		 .then(function (response) {
		 console.log(response);
		 if(response.data.code === 200){
		 console.log("Login successfull");
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
  render () {
    return (
      <div style={{width:"500px"}}>
        <Container>
        <h1>Forgot your password?</h1>
        <p>Enter your email address below, and we'll email instructions for setting a new one.</p>

        <form method="POST" className="form-group">
          <input type="email" className="form-control" style={{borderRadius:"20px"}} placeholder="Enter Email" required/>
          <input type="submit" value="Send me instructions!" className="btn btn-warning" style={{marginTop:"15px", borderRadius:"20px"}}/>
        </form>
        </Container>
      </div>
      )
  }
}
