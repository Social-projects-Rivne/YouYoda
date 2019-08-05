import React from 'react';

import Home from './Pages/Home';
import {Route, BrowserRouter as Router} from 'react-router-dom';
import EnterNewPassword from './Components/EnterNewPassword';


export default function Routes() {
  return (
      <div>
      
    <Router>
        <Route path={'/$'} component={Home}/>
        <Route path={'/reset/password/new/:uid/:token'} component={EnterNewPassword}/>
    </Router>
    </div>
  );
};
