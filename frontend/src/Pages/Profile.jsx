import React from 'react';

import {API} from '../api/axiosConf';
import Footer from '../Components/Footer';
import PageHeader from '../Components/PageHeader';
import {ProfileContext} from '../Components/profile-context';
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
        const response = await API.get('user/profile/view');
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
