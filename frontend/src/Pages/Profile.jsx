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
        userCompletedCourses: [],
        userFollowingCourses: [],
        userFavouritesCourses: [],
        loading: true,
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
        let userCompletedCourses = [];
        let userFollowingCourses = [];
        let userFavouritesCourses = [];
        if (typeof userData !== 'undefined') {
          let userInfo = {}
          Object.keys(userData).map(function (key) {
              userInfo[key] = userData[key]
          })
          for(let i = 0; i < userCourses.length; i++)
            for(let j = 0; j < userCourses[i].subscribed.length; j++)
            {
              if(userCourses[i].subscribed[j].completed)
                userCompletedCourses.push(userCourses[i])
              else
                userFollowingCourses.push(userCourses[i])
              if(userCourses[i].subscribed[j].is_favourite)
                userFavouritesCourses.push(userCourses[i])
            }
        this.setState({
          userInfo: userInfo,
          userCompletedCourses: userCompletedCourses,
          userFollowingCourses: userFollowingCourses,
          userFavouritesCourses: userFavouritesCourses,
          loading: false,
        })
      }
      console.log(userCourses[0].subscribed[0].feedback);
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
