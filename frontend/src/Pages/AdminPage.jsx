import React from 'react';

//import AdminDashboard from '../Components/AdminDashboard';
import Footer from '../Components/Footer';
import ProfileHeader from '../Components/ProfileHeader';
import '../style/adminPage.css';

import {Redirect} from 'react-router-dom';

import {isAuthorized} from '../api/isAuthorized';


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
                if(response.role == 3) {
                    this.setState({
                        displayDashboard: 'block'
                    });
                    console.log('response correct - user is admin');
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
            this.setState({ 
                redirect: true,
                redirectTo: urlRedirect
            });
            console.log('not authorized');
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