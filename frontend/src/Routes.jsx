import React from 'react';

import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'

import AdminPage from "./Pages/AdminPage";
import AdminDashboard from './Components/AdminDashboard';
import AdminPageInner from './Components/AdminPageInner';
import ConfirmSendingEmail from './Components/ConfirmSendingEmail';
import Home from './Pages/Home';
import MainLayout from './Pages/MainLayout';
import EditPageProfile from "./Pages/EditPageProfile";
import EnterNewPassword from './Components/EnterNewPassword';
import SendActivationEmail from './Components/SendActivationEmail';
import ConfirmActivationEmail from './Components/ConfirmActivationEmail';
import ResetPassword from './Components/ResetPassword';
import Profile from './Pages/Profile';


export default function Routes() {
  return (
      <div>
        <Router>
            <Route exact path='/' component={Home}/>
            <Route component={AdminPage}>
                <Switch>
                    <Route exact path='/admin'
                        render={()=><AdminPage><AdminDashboard/></AdminPage>}/>
                    <Route exact path={'/admin/:option'}
                        render={()=><AdminPage><AdminPageInner/></AdminPage>}/>
                </Switch>
            </Route>
            <Route path='/profile' component={Profile}/>
            <Route path='/editprofile' component={EditPageProfile}/>
            <Route component={MainLayout}>
                <Route exact path='/reset/password'
                    render={()=><MainLayout><ResetPassword/></MainLayout>}/>
                <Route path='/reset/password/confirm'
                    render={()=><MainLayout><ConfirmSendingEmail/></MainLayout>}/>
                <Route path={'/reset/password/new/:uid/:token'}
                    render={()=><MainLayout><EnterNewPassword/></MainLayout>}/>
                <Route exact path='/activation/send/email'
                    render={()=><MainLayout><SendActivationEmail/></MainLayout>}/>
                <Route exact path='/activate/user/:uid/:token'
                    render={()=><MainLayout><ConfirmActivationEmail/></MainLayout>}/>
            </Route>
        </Router>
      </div>
  );
};
