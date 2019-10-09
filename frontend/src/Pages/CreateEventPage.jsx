import React from 'react';

import CreateEvent from "../Components/CreateEvent";
import Footer from "../Components/Footer";
import PageHeader from '../Components/PageHeader';

export default class CreateEventPage extends React.Component{
    render(){
        return(
            <>
            <PageHeader/>
            <CreateEvent/>
            <Footer/>
            </>
        )
    }
}
