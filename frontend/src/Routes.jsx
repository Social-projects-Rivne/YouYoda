import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'

import ConfirmActivationEmail from './Components/ConfirmActivationEmail';
import ConfirmSendingEmail from './Components/ConfirmSendingEmail';
import CourseDetail from './Components/CourseDetail';
import Home from './Pages/Home';
import HomeCourses from './Components/HomeCourses';
import EditPageProfile from "./Pages/EditPageProfile";
import EnterNewPassword from './Components/EnterNewPassword';
import MainLayout from './Pages/MainLayout';
import NotFoundPage from './Pages/NotFoundPage';
import Profile from './Pages/Profile';
import ResetPassword from './Components/ResetPassword';
import SendActivationEmail from './Components/SendActivationEmail';
import SearchingCourses from './Components/SearchingCourses';
import SearchingEvents from './Components/SearchingEvents';


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
                <Route path="/courses/search"
                    render={()=><MainLayout><SearchingCourses/></MainLayout>}
                />
                <Route path="/events/search"
                    render={()=><MainLayout><SearchingEvents/></MainLayout>}
                />
                <Route exact path='/course/detail'
                   render={(props)=><MainLayout><CourseDetail course = {props.location.state.course}/></MainLayout>}
                />
                
            </Route>

        </Switch>
        {/* <Route path="*" component={NotFoundPage} /> */}
        </Router>
    </div>
  );
}
};
