import React from 'react';
import { toast } from 'react-toastify';

import {API} from '../api/axiosConf';
import Footer from '../Components/Footer';
import PageHeader from '../Components/PageHeader';
import {ProfileContext} from '../Components/profile-context';
import ProfileInfo from '../Components/ProfileInfo';
import ProfileMainInfo from '../Components/ProfileMainInfo';


export default class Profile extends React.Component{
    constructor(props) {
      super(props);
      this.state = {
        userInfo: {},
        userCourses: [],
      };
    }

    getInfo = async () => {
      try {
        const response = await API.get('user/profile/view');
        return response.data;
      }
      catch (error) {
        toast.error("For some reason now you can not view your profile, please contact support")
      }
    };

    getCourses = async () => {
      try {
        const response = await API.get('user/profile/courses');
        return response.data;
      }
      catch (error) {
        toast.error("For some reason now you can not view your courses, please contact support")
      }
    };

    async componentDidMount() {
        let userData = await this.getInfo();
        let userCourses = await this.getCourses();
        if (typeof userData !== 'undefined') {
          let userInfo = {}
          Object.keys(userData).map(function (key) {
              userInfo[key] = userData[key]
          })
        this.setState({
          userInfo: userInfo,
          userCourses: userCourses
        })
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
