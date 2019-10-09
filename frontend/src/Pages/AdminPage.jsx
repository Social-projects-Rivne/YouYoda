import React from 'react';
import { Redirect } from 'react-router-dom';

import Footer from '../Components/Footer';
import { isAuthorized } from '../api/isAuthorized';
import PageHeader from '../Components/PageHeader';
import '../style/adminPage.scss';
import '../style/dataTable.css';
import { ROLE_ADMIN, ROLE_MODERATOR } from '../utils';


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
                if(parseInt(response.role) === ROLE_ADMIN) {
                    this.setState({
                        displayDashboard: 'block'
                    });    
                }
                else {
                    /** user is moderator or simple user */
                    if(parseInt(response.role) === ROLE_MODERATOR)
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
                <main style={{display:displayDashboard}} style={{minHeight:'80vh', background: '#e8e8e8'}} >{this.props.children}</main>
            <Footer/>
            </>
        );
    }
}