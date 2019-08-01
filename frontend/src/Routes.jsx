import React from 'react';

import Home from './Pages/Home';
import {Route, BrowserRouter as Router} from 'react-router-dom';
import EditPageProfile from "./Pages/EditPageProfile";


export default function Routes() {
  return (
    <Router>
    <div>
        <Route exact path='/' component={Home}/>
        <Route path='/editprofile' component={EditPageProfile}/>
    </div>
    </Router>
  );
};
