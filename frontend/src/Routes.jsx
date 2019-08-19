import React from 'react';
import ReactDOM from 'react-dom'
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'

import Home from './Pages/Home';
import EditPageProfile from "./Pages/EditPageProfile";
import EnterNewPassword from './Components/EnterNewPassword';
import ResetPassword from './Components/ResetPassword';
import Profile from './Pages/Profile';


export default function Routes() {
  return (
      
    <Router>
    <div>
        <Route exact path='/' component={Home}/>
        <Route path='/profile' component={Profile}/>
        <Route path='/editprofile' component={EditPageProfile}/>
        <Route exact path='/reset/password' component={ResetPassword}/> 
        <Route path={'/reset/password/new/:uid/:token'} component={EnterNewPassword}/>
    </div>

    </Router>
  );
};
