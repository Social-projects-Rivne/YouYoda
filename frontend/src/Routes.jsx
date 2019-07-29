import React from 'react'
import ReactDOM from 'react-dom'
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
/* import Home from './Pages/HomePage'; */
import LoginForm from './Components/LoginForm';


function Routes() {

  return (

    <Router>
      <div>
        <Route path="/login" component={LoginForm} />
      </div>
    </Router>
  )
}

export default Routes;