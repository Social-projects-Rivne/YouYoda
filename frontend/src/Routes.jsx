import React from 'react';

import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'

import ConfirmSendingEmail from './Components/ConfirmSendingEmail';
import Events from './Pages/Events';
import Home from './Pages/Home';
import MainLayout from './Pages/MainLayout';
import EditPageProfile from "./Pages/EditPageProfile";
import NotFoundPage from './Pages/NotFoundPage';
import EnterNewPassword from './Components/EnterNewPassword';
import SendActivationEmail from './Components/SendActivationEmail';
import ConfirmActivationEmail from './Components/ConfirmActivationEmail';
import ResetPassword from './Components/ResetPassword';
import Profile from './Pages/Profile';



export default class Routes extends React.Component{
  render(){
    return (
      <div>
        <Router>
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/profile' component={Profile}/>
            <Route path='/editprofile' component={EditPageProfile}/>
            <Route path='/events' component={Events}/>
            <Route component={MainLayout}>
            <Switch>
                <Route exact path='/reset/password'
                    render={()=><MainLayout><ResetPassword/></MainLayout>}
                />
                <Route exact path='/reset/password/confirm'
                    render={()=><MainLayout><ConfirmSendingEmail/></MainLayout>}
                />
                <Route exact path={'/reset/password/new/:uid/:token'}
                    render={()=><MainLayout><EnterNewPassword/></MainLayout>}
                />
                <Route exact path='/activation/send/email'
                    render={ (props) =>
                        <MainLayout>
                            <SendActivationEmail email = {props.location.state.email}/>
                        </MainLayout>}
                />
                <Route exact path='/activate/user/:uid/:token'
                    render={()=><MainLayout><ConfirmActivationEmail/></MainLayout>}
                />
                <Route path="*" component={NotFoundPage} />
            </Switch>
            </Route>

        </Switch>
        </Router>
    </div>
  );
}
};
