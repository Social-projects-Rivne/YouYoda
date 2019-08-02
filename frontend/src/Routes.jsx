import React from 'react';
import ReactDOM from 'react-dom'
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'

import Home from './Pages/Home';
import LoginForm from './Components/LoginForm';



export default function Routes() {
  return (
    <Router>
    <div>
        <Route path='/' component={Home}/>
        <Route path="/login" component={LoginForm} />
    </div>
    </Router>
  );
};


