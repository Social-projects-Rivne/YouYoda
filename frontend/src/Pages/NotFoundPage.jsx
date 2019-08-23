import React from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Footer from '../Components/Footer';
import Header from '../Components/Header';


export default class NotFoundPage extends React.Component{
    render(){
        return(
            <>
            <Header/>
            <div className="page-404">
                <h1>404 Page Not Found</h1>
                <h2>
                    <div className="dragon-div"><FontAwesomeIcon icon="dragon" size="10x"/></div>
                    <Link to="/">Go to Home </Link>
                </h2>
            </div>
            <Footer/>
            </>
        )
    }
}
