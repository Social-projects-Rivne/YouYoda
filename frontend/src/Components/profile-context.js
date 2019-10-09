import React from 'react'


export const ProfileContext = React.createContext({
  userInfo: {},
  userCompletedCourses: [],
  userFollowingCourses: [],
  userFavouritesCourses: [],
  userCompletedEvents: [],
  userFollowingEvents: [],
  userCreatedEvents: [],
  userAchievements: {},
  updateProfile: () => {}
});
