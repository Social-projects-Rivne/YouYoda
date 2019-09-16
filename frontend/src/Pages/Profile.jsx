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
        userFollowingEvents: [],
        userCompletedEvents: [],
        userCreatedEvents: [],
        userAchievements: [],
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

    getEvents = async () => {
      try {
        const response = await API.get('user/profile/events');
        return response.data;
      }
      catch (error) {
        toast.error("For some reason now you can not view your events, please contact support")
      }
    };

    getAchievements = async () => {
      try {
        const response = await API.get('user/profile/achievements');
        return response.data;
      }
      catch (error) {
        toast.error("For some reason now you can not view your achievements, please contact support")
      }
    };

    async componentDidMount() {
        let userData = await this.getInfo();
        let userCourses = await this.getCourses();
        let userEvents = await this.getEvents();
        let userAchievements = await this.getAchievements();
        let userCompletedCourses = [];
        let userFollowingCourses = [];
        let userFavouritesCourses = [];
        let userCompletedEvents = [];
        let userFollowingEvents = [];
        let userCreatedEvents = [];
        if (typeof userData !== 'undefined') {
          let userInfo = {}
          Object.keys(userData).map(function (key) {
              userInfo[key] = userData[key]
          })
          for(let course in userCourses)
            for(let subscribed in userCourses[course].subscribed)
            {
              if(userCourses[course].subscribed[subscribed].completed)
                userCompletedCourses.push(userCourses[course])
              else
                userFollowingCourses.push(userCourses[course])
              if(userCourses[course].subscribed[subscribed].is_favourite)
                userFavouritesCourses.push(userCourses[course])
            }
          for(let event in userEvents)
            for(let subscribed in userEvents[event].subscribed)
            {
              if(userEvents[event].subscribed[subscribed].completed)
                userCompletedEvents.push(userEvents[event])
              else
                userFollowingEvents.push(userEvents[event])
              if(userEvents[event].owner == userData.first_name + ' ' + userData.last_name)
                userCreatedEvents.push(userEvents[event])
            }
        this.setState({
          userInfo: userInfo,
          userCompletedCourses: userCompletedCourses,
          userFollowingCourses: userFollowingCourses,
          userFavouritesCourses: userFavouritesCourses,
          userCompletedEvents: userCompletedEvents,
          userFollowingEvents: userFollowingEvents,
          userCreatedEvents: userCreatedEvents,
          userAchievements: userAchievements,
          loading: false,
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
