import React from 'react';

import Home from './Pages/Home';
import {Route, BrowserRouter as Router} from 'react-router-dom';


export default function Routes() {
  return (
    <Router>
    <div>
        <Route path='/' component={Home}/>
    </div>
    </Router>
  );
};
