import React from 'react';

import Home from './Pages/Home';
import {Route, BrowserRouter as Router} from 'react-router-dom';
import EnterNewPassword from './Components/EnterNewPassword';
import ResetPassword from './Components/ResetPassword';


export default function Routes() {
  return (
      <div>

    <Router>
        <Route exact path='/' component={Home}/>
        <Route exact path='/reset/password' component={ResetPassword}/>
        <Route path={'/reset/password/new/:uid/:token'} component={EnterNewPassword}/>
    </Router>
    </div>
  );
};
