import React from 'react';

import ProfileInfo from '../Components/ProfileInfo';
import ProfileHeader from '../Components/ProfileHeader';
import Footer from '../Components/Footer';
import UserCourses from '../Components/UserCourses';


export default class Profile extends React.Component{

  render(){
      return(
          <>
          <ProfileHeader/>
          <ProfileInfo/>
          <UserCourses/>
          </>
      )
  }
}
