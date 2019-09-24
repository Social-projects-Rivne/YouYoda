import React from 'react';
import { Link } from 'react-router-dom';

import Footer from '../Components/Footer';
import PageHeader from '../Components/PageHeader';


export default class NotFoundPage extends React.Component{
    render(){
        return(
            <>
            <PageHeader/>
            <div className="page-404">
                <h1>Occurred, a 404 Error Has...</h1>
                <div>Yoda Doing Yoga, and Do You?</div>
                <h2>
                    <div className="dragon-div">
                        <img src={require('../img/static/yodayoga.jpg')}
                            className="img404" alt="YouYoda 404 Page"/>
                    </div>
                    <Link to="/courses/search">Go To Search Courses</Link>
                </h2>
            </div>
            <Footer/>
            </>
        )
    }
}
