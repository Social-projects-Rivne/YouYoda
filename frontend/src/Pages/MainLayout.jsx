import React from 'react';

import Footer from '../Components/Footer';
import Header from '../Components/Header';


export default class MainLayout extends React.Component{

    render(){
        return(
            <>
            <Header/>
            <main>{this.props.children}</main>
            <Footer/>
            </>
        )
    }
}
