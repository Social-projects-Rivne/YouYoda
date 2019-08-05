import React from 'react';
import axios from 'axios';
import {Container} from 'reactstrap';

export default class ResetPassword extends React.Component{
    constructor(props){
    	super(props);

    	this.state={email:''};
	}
    handleClick(event){
		 let apiBaseUrl = "http://localhost:8000/";
		 let userdata={"email":this.state.email}

		 axios.post(apiBaseUrl+'auth/users/reset_password/', userdata)
		 .then(function (response) {
		 console.log(response);
		 alert("Password confirmation has been sent to your email")
		 if(response.data.code === 204){
		 console.log("Successfull");
		 }
		 else if(response.data.code === 400){
		 console.log("Bad request");
		 }
		 else{
		 console.log("Something goes wrong");
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
					<input type="email"
							className="form-control"
							style={{borderRadius:"20px"}}
							placeholder="Enter Email"
							onChange = {(event,newValue) => this.setState({email:newValue})}
							required/>
					<input type="submit"
							value="Send me instructions!"
							className="btn btn-warning"
							style={{marginTop:"15px", borderRadius:"20px"}}
							onClick={(event) => this.handleClick(event)}/>
        </form>
        </Container>
      </div>
      )
  }
}
