import React from 'react';
import {Redirect} from 'react-router-dom';

import Footer from '../Components/Footer';
import {isAuthorized} from '../api/isAuthorized';
import ProfileHeader from '../Components/ProfileHeader';
import '../style/adminPage.css';
import '../style/dataTable.css';


export default class AdminPage extends React.Component{
    constructor(props){
    	super(props);
    	this.state = { 
            redirect: false,
            redirectTo: '/',
            displayDashboard: 'none'
        };
	}

    async componentDidMount() {
        let response = await isAuthorized('role');
        var urlRedirect = '/';
        if(typeof response === 'object') {
            if(response.data_status === 'role' && response.role > 0) {
                /** response correct - user is admin */
                if(response.role == 3) {
                    this.setState({
                        displayDashboard: 'block'
                    });    
                }
                else {
                    if(response.role == 2)
                        urlRedirect = '/moderator';
                    this.setState({ 
                        redirect: true,
                        redirectTo: urlRedirect
                    });
                }
            }
        }
        else {
            /** not authorized */
            this.setState({ 
                redirect: true,
                redirectTo: urlRedirect
            });
        }
    }

    render(){
        const { redirect, redirectTo, displayDashboard } = this.state;
        if (redirect) {
            return <Redirect to={redirectTo}/>;
        }
        return(
            <>
            <ProfileHeader/>
                <main style={{display:displayDashboard}}>{this.props.children}</main>
            <Footer/>
            </>
        );
    }
}