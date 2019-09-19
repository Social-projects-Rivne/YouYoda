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

        this.setState({
          userInfo: userData,
          userCompletedCourses: userCourses['completed'],
          userFollowingCourses: userCourses['following'],
          userFavouritesCourses: userCourses['favourites'],
          userCompletedEvents: userEvents['completed'],
          userFollowingEvents: userEvents['following'],
          userCreatedEvents: userEvents['created'],
          userAchievements: userAchievements,
          loading: false,
        })
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
