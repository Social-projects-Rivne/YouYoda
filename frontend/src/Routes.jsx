import React from 'react'
import ReactDOM from 'react-dom'

import Home from './Pages/Home';
import Profile from './Pages/Profile';
import {Route, BrowserRouter as Router} from 'react-router-dom';
import EditPageProfile from "./Pages/EditPageProfile";


export default function Routes() {
  return (
    <Router>
    <div>
        <Route exact path='/' component={Home}/>
        <Route path='/profile' component={Profile}/>
        <Route path='/editprofile' component={EditPageProfile}/>
    </div>
    </Router>
  );
};
