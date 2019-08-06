import React from 'react';
import { Redirect } from 'react-router-dom';
//import axios from 'axios';
import { Button, Col, Modal, Row } from 'reactstrap';
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
            redirect: false
        }
        this.rowGetter = this.rowGetter.bind(this);
    }
    rowGetter = () => {
        if(this.state) {
          console.log(this.state);
          return this.state;
        }
        else {
          console.log('undefined this.state');
          return {};
        }
    }
    handleClick(event){
        event.preventDefault();
        registration(this.state);
    this.setState({ redirect: true });
        return false;
    }
    render () {
        const { redirect } = this.state;
        if (redirect) {
            //return <Redirect to='/somewhere'/>;
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
                        <form className="form-horizontal">
                            <div className="form-group">
                                <label htmlFor="email" className="mb-1">Email</label>
                                <input type="email" id="email" name="email" className="form-control" 
                                onChange={(event,newValue) => this.setState({email:newValue})} 
                                required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password" className="mb-1">Password</label>
                                <input type="password" id="password" name="password" className="form-control" 
                                onChange = {(event,newValue) => this.setState({password:newValue})}
                                required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="confirmpass" className="mb-1">Confirm Password</label>
                                <input type="password" id="confirmpass" name="confirmpass" className="form-control" 
                                onChange = {(event,newValue) => this.setState({confirmpass:newValue})}
                                required
                                />
                            </div>
                            <span className="text-title">Profile type</span>
                            <Row className="form-group">
                                <Col md="6" className="form-check col-xs-6">
                                    <input className="form-check-input" type="radio"
                                        name="typeUser" id="userstudent" value="option1" defaultChecked
                                        checked={this.state.userstudent}
                                        onChange={(event) => {
                                            this.setState({userteacher:false, userstudent:true});
                                            this.rowGetter();
                                        }}
                                        />
                                    <label className="form-check-label" htmlFor="userstudent">I want to develop myself</label>
                                </Col>
                                <Col md="6" className="form-check col-xs-6">
                                    <input className="form-check-input" type="radio"
                                        name="typeUser" id="userteacher" value="option2"
                                        checked={this.state.userteacher}                                       
                                        onChange={(event) => {
                                            this.setState({userteacher:true, userstudent:false});
                                            this.rowGetter();
                                        }}
                                        />
                                    <label className="form-check-label" htmlFor="userteacher">I'm a teacher/coach</label>
                                </Col>
                            </Row>
                            <div className="form-group">
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="isagreed" name="isagreed" required />
                                    <label className="form-check-label" htmlFor="isagreed">I Accept terms and conditions & privacy policy</label>
                                </div>
                            </div>
                            <div className="form-group text-right">
                                <button type="submit" className="btn-yellow btn btn-warning"
                                onClick={(event) => this.handleClick(event)}>Sign up</button>
                            </div>
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