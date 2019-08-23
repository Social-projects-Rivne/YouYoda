import React from 'react';

import axios from 'axios';

import Footer from '../Components/Footer';
import {ProfileContext} from '../Components/profile-context';
import PageHeader from '../Components/PageHeader';
import ProfileInfo from '../Components/ProfileInfo';
import ProfileMainInfo from '../Components/ProfileMainInfo';
import UserCourses from '../Components/UserCourses';



export default class Profile extends React.Component{
    constructor(props) {
      super(props);
      this.state = {
        userInfo: {},
      };
    }
    getInfo = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/user/profile/view', {headers: { Authorization: "Token " + localStorage.getItem('token')}});
        return response.data;
      }
      catch (error) {
        console.error(error);
      }
    };
    async componentDidMount() {
        let userData = await this.getInfo();
        if (typeof userData !== 'undefined') {
          let userInfo = {}
          Object.keys(userData).map(function (key) {
              userInfo[key] = userData[key]
          })
        this.setState(userInfo)
      }
    }

  render(){
      return(
          <>
          <ProfileContext.Provider value={this.state}>
            <PageHeader/>
            <ProfileInfo/>
            <ProfileMainInfo/>
            <Footer/>
          </ProfileContext.Provider>
          </>
      )
  }
}
