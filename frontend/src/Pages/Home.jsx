import React from 'react';

import Footer from '../Components/Footer';
import HomeAbout from '../Components/HomeAbout';
import HomeCourses from '../Components/HomeCourses';
import HomeEvent from '../Components/HomeEvent';
import HomeHeader from '../Components/HomeHeader';
import HomeLastBlock from '../Components/HomeLastBlock';
import HomeTrainers from '../Components/HomeTrainers';
import Registration from '../Components/Registration';


export default class Home extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        }
        this.handleClickReg = this.handleClickReg.bind(this);
     }
    handleClickReg() {
        console.log('Click happened');
        this.setState(prevState => ({
            isOpen: !prevState.isOpen
        }));
    }
    render(){
        return(
            <>
            <HomeHeader handleClickReg={this.handleClickReg}/>
            <HomeAbout/>
            <HomeEvent/>
            <HomeTrainers/>
            <HomeCourses/>
            <HomeLastBlock handleClickReg={this.handleClickReg}/>
            <Footer/>
            <Registration handleClickReg={this.handleClickReg} isOpen={this.state.isOpen} />
            </>
        )
    }
}
