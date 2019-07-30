import React from 'react';
import { Button, Modal, Row } from 'reactstrap';

class Registration extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          modal: false
        };
    
        this.toggle = this.toggle.bind(this);
    }
    
    toggle() {
        this.setState(prevState => ({
          modal: !prevState.modal
        }));
    }
  render () {
    return (
    <div>
        <Button color="danger" onClick={this.toggle}>Click here</Button>
        <Modal id="registration-form" isOpen={this.state.modal} toggle={this.toggle} className="wild">
            <div className="modal-body">

            <Row>
                <div className="col-md-5 left-wrap">
                    <div className="row container h-50 mx-0 mb-4">
                        <h1 className="modal-title text-white custom-title">Hello, <span>Dear Friend!</span></h1>
                    </div>
                    <div className="row container h-auto">
                        <div className="col-sm-12 form-group">
                            <span className="text-title text-white d-block pb-2">If you already have an account</span>
                            <button type="button" className="btn-grey btn">Log in</button>
                        </div>
                    </div>
                </div>
                <div className="col-md-offset-3 col-md-7 right-wrap">
                    <button onClick={this.toggle} type="button" className="close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <h3 className="modal-title">Register</h3>
                    <form className="form-horizontal">
                        <div className="form-group">
                            <label htmlFor="email" className="mb-1">Email</label>
                            <input type="email" id="email" name="email" className="form-control" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password" className="mb-1">Password</label>
                            <input type="password" id="password" name="password" className="form-control" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirmpass" className="mb-1">Confirm Password</label>
                            <input type="password" id="confirmpass" name="confirmpass" className="form-control" required />
                        </div>
                        <span className="text-title">Profile type</span>
                        <div className="form-group row">
                            <div className="form-check col-xs-6 col-md-6">
                                <input className="form-check-input" type="radio" name="typeUser" id="userstudent" value="option1" defaultChecked />
                                <label className="form-check-label" htmlFor="userstudent">I want to develop myself</label>
                            </div>
                            <div className="form-check col-xs-6 col-md-6">
                                <input className="form-check-input" type="radio" name="typeUser" id="userteacher" value="option2" />
                                <label className="form-check-label" htmlFor="userteacher">I'm a teacher/coach</label>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="isagreed" name="isagreed" required />
                                <label className="form-check-label" htmlFor="isagreed">I Accept terms and conditions & privacy policy</label>
                            </div>
                        </div>
                        <div className="form-group text-right">
                            <button type="submit" className="btn-yellow btn btn-warning">Sign up</button>
                        </div>
                    </form>
                </div>
            </Row>

            </div>
      </Modal>
    </div>
      )
  }
}

export default Registration;