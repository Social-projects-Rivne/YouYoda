import React from 'react';

import axios from 'axios';
import {Container} from 'reactstrap';


export default class EnterNewPassword extends React.Component{
    constructor(props){
    	super(props);

    	this.state={new_password:'',
                    re_new_password:''};
	}
    handleClick(event){
		 let apiBaseUrl = "http://localhost:8000/";
		 let userdata={"uid":this.props.match.params.uid,
            "token":this.props.match.params.token,
            "new_password":this.state.new_password,
            "re_new_password":this.state.new_password
            }

		 axios.post(apiBaseUrl+'auth/users/reset_password_confirm/', userdata)
		 .then(function (response) {
    		 console.log(response);
    		 if(response.data.code === 204){
    		 console.log("Successfull");
             alert("Password was changed")
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
        <h1>Forgot your password?{this.props.match.params.uid}</h1>
        <p>Enter your email address below, and we'll email instructions for setting a new one.</p>

        <form method="POST" className="form-group">
					<input type="password"
							className="form-control"
							style={{borderRadius:"20px", marginBottom:"15px"}}
							placeholder="Enter New Password"
							onChange = {(event,newValue) => this.setState({new_password:newValue})}
							required/>
                    <input type="password"
							className="form-control"
							style={{borderRadius:"20px", marginBottom:"15px"}}
							placeholder="Retype New Password"
							onChange = {(event,newValue) => this.setState({re_new_password:newValue})}
							required/>
					<input type="submit"
							value="Change password"
							className="btn btn-warning"
							style={{marginTop:"15px", borderRadius:"20px"}}
							onClick={(event) => this.handleClick(event)}/>
        </form>
        </Container>
      </div>
      )
  }
}
