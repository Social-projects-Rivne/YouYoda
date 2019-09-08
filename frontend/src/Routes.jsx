import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'


import AdminDashboard from './Components/AdminDashboard';
import AdminPage from "./Pages/AdminPage";
import AdminPageInner from './Components/AdminPageInner';
import ConfirmActivationEmail from './Components/ConfirmActivationEmail';
import ConfirmSendingEmail from './Components/ConfirmSendingEmail';
import CourseDetail from './Components/CourseDetail';
import Home from './Pages/Home';
import HomeCourses from './Components/HomeCourses';
import EditPageProfile from "./Pages/EditPageProfile";
import EnterNewPassword from './Components/EnterNewPassword';
import MainLayout from './Pages/MainLayout';
import ModeratorDashboard from './Components/ModeratorDashboard';
import ModeratorPage from "./Pages/ModeratorPage";
import ModeratorPageInner from './Components/ModeratorPageInner';
import NotFoundPage from './Pages/NotFoundPage';
import Profile from './Pages/Profile';
import ResetPassword from './Components/ResetPassword';
import SendActivationEmail from './Components/SendActivationEmail';


export default class Routes extends React.Component{
  render(){
    return (
      <div>
        <Router>
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/profile' component={Profile}/>
            <Route path='/editprofile' component={EditPageProfile}/>
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
                <Route exact path='/course/detail'
                    render={(props)=><MainLayout><CourseDetail course = {props.location.state.course}/></MainLayout>}
                />
                <Route exact path='/admin'
                    render={()=><AdminPage><AdminDashboard/></AdminPage>}/>
                <Route exact path={'/admin/:option'}
                    render={()=><AdminPage><AdminPageInner/></AdminPage>}/>
                <Route exact path='/moderator'
                    render={()=><ModeratorPage><ModeratorDashboard/></ModeratorPage>}/>
                <Route exact path={'/moderator/:option'}
                    render={()=><ModeratorPage><ModeratorPageInner/></ModeratorPage>}/>
                <Route path="*" component={NotFoundPage} />
            </Switch>
            </Route>
            <Route path="*" component={NotFoundPage} />
        </Switch>
        </Router>
      </div>
  );
}
};
