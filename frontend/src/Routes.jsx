import React from 'react';

import Home from './Pages/Home';
import MainLayout from './Pages/MainLayout';
import {Route, BrowserRouter as Router} from 'react-router-dom';
import EnterNewPassword from './Components/EnterNewPassword';
import ResetPassword from './Components/ResetPassword';


export default function Routes() {
  return (
      <div>
        <Router>
            <Route exact path='/' component={Home}/>
            <Route component={MainLayout}>
                <Route exact path='/reset/password'
                    render={()=><MainLayout><ResetPassword/></MainLayout>}/>
                <Route path={'/reset/password/new/:uid/:token'}
                    render={()=><MainLayout><EnterNewPassword/></MainLayout>}/>
            </Route>
        </Router>
    </div>
  );
};
