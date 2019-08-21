import React from 'react';

import AdminDashboard from '../Components/AdminDashboard';
import Footer from '../Components/Footer';
import ProfileHeader from '../Components/ProfileHeader';
import '../style/adminPage.css';


export default class AdminPage extends React.Component{
    render(){
        return(
            <>
            <ProfileHeader/>
            <AdminDashboard/>
            <Footer/>
            </>
        );
    }
}