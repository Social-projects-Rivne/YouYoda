import React from 'react';
import HomeHeader from '../Components/HomeHeader';
import Footer from '../Components/Footer';
import HomeAbout from '../Components/HomeAbout';
import HomeEvent from '../Components/HomeEvent';
import HomeTrainers from '../Components/HomeTrainers';
import HomeCourses from '../Components/HomeCourses';
import HomeLastBlock from '../Components/HomeLastBlock';
import Registration from '../Components/Registration';

class Home extends React.Component{

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

export default Home;
