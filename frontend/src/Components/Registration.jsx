import React from 'react';

class Registration extends React.Component{
  render () {
    return (
      <div className="modal fade show" id="registration-form" tabIndex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog wild" role="document">
        <div class="modal-content">
            <div className="modal-body">

            <div className="row">
                <div className="col-md-5 left-wrap">
                    <div class="row container h-50 mx-0 mb-4">
                        <h1 className="modal-title text-white custom-title">Hello, <span>Dear Friend!</span></h1>
                    </div>
                    <div class="row container h-auto">
                        <div class="col-sm-12 form-group">
                            <span class="text-title text-white d-block pb-2">If you already have an account</span>
                            <button type="button" className="btn-grey btn">Log in</button>
                        </div>
                    </div>
                </div>
                <div className="col-md-offset-3 col-md-7 right-wrap">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <h3 class="modal-title">Register</h3>
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
            </div>

            </div>
        </div>
        </div>
      </div>
      )
  }
}

export default Registration;