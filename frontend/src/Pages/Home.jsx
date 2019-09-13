import React from 'react';

import LoginForm from '../Components/LoginForm';
import HomeAbout from '../Components/HomeAbout';
import HomeCourses from '../Components/HomeCourses';
import HomeEvent from '../Components/HomeEvent';
import HomeHeader from '../Components/HomeHeader';
import HomeLastBlock from '../Components/HomeLastBlock';
import HomeTrainers from '../Components/HomeTrainers';
import Footer from '../Components/Footer';
import Registration from '../Components/Registration';


export default class Home extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            isOpenL: false
        }
     }
    handleClickReg = () => {
        this.setState(prevState => ({
            isOpen: !prevState.isOpen
        }));
    }
    handleClickLogin = () => {
        this.setState(prevState => ({
            isOpenL: !prevState.isOpenL
        }));
    }
    render(){
        return(
            <>
            
            <HomeHeader handleClickReg={this.handleClickReg} handleClickLogin={this.handleClickLogin}/>
            <HomeAbout/>
            <HomeEvent/>
            <HomeTrainers/>
            <HomeCourses/>
            <HomeLastBlock handleClickReg={this.handleClickReg} handleClickLogin={this.handleClickLogin}/>
            <Footer/>
            <LoginForm handleClickLogin={this.handleClickLogin} handleClickReg={this.handleClickReg} isOpenL={this.state.isOpenL} />
            <Registration handleClickReg={this.handleClickReg} handleClickLogin={this.handleClickLogin} isOpen={this.state.isOpen} />
            </>
        )
    }
}