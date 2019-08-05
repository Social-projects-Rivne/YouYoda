import React from 'react';

import Home from './Pages/Home';
import Profile from './Pages/Profile';
import {Route, BrowserRouter as Router} from 'react-router-dom';


export default function Routes() {
  return (
    <Router>
    <div>
        <Route exact path='/' component={Home}/>
        <Route path='/profile' component={Profile}/>
    </div>
    </Router>
  );
};
