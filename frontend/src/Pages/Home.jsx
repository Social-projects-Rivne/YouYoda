import React from 'react';

import Footer from '../Components/Footer';
import HomeAbout from '../Components/HomeAbout';
import HomeCourses from '../Components/HomeCourses';
import HomeEvent from '../Components/HomeEvent';
import HomeHeader from '../Components/HomeHeader';
import HomeLastBlock from '../Components/HomeLastBlock';
import Registration from '../Components/Registration';
import HomeTrainers from '../Components/HomeTrainers';


export default class Home extends React.Component{

    render(){
        return(
            <>
            <HomeHeader/>
            <HomeAbout/>
            <HomeEvent/>
            <HomeTrainers/>
            <HomeCourses/>
            <HomeLastBlock/>
            <Footer/>
            <Registration/>
            </>
        )
    }
}
