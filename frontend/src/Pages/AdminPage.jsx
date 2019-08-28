import React from 'react';
import {Redirect} from 'react-router-dom';

import Footer from '../Components/Footer';
import {isAuthorized} from '../api/isAuthorized';
import PageHeader from '../Components/PageHeader';
import '../style/adminPage.css';
import '../style/dataTable.css';


const ROLE_ADMIN = 3,
      ROLE_MODERATOR = 2;

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
                if(response.role == ROLE_ADMIN) {
                    this.setState({
                        displayDashboard: 'block'
                    });    
                }
                else {
                    /** user is moderator or simple user */
                    if(response.role == ROLE_MODERATOR)
                        urlRedirect = '/moderator';
                    this.setState({ 
                        redirect: true,
                        redirectTo: urlRedirect
                    });
                }
            }
        }
        else {
            /** not authorized or get param authorized */
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
            <PageHeader/>
                <main style={{display:displayDashboard}}>{this.props.children}</main>
            <Footer/>
            </>
        );
    }
}