import React from 'react';

import Footer from '../Components/Footer';
import PageHeader from '../Components/PageHeader';


export default class MainLayout extends React.Component{
    render(){
        return(
            <>
            <PageHeader/>
                <main>{this.props.children}</main>
            <Footer/>
            </>
        )
    }
}
