import React from 'react';

import EventsList from '../Components/EventsList';
import PageHeader from '../Components/PageHeader';
import Footer from '../Components/Footer';


export default class Events extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
        }
        
    }
    render(){
        return(
            <>
            <PageHeader/>
            <EventsList/>
            <Footer/>
            </>
        )
    }
};