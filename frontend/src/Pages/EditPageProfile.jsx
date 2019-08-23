 import React from 'react';

import FillEditPage from "../Components/FillEditPage";
import Footer from "../Components/Footer";
import PageHeader from '../Components/PageHeader';


export default class EditPageProfile extends React.Component{
    render(){
        return(
            <>
            <PageHeader/>
            <FillEditPage/>
            <Footer/>
            </>
        )
    }
}
