import React from 'react';
import { Redirect } from 'react-router-dom';

import Footer from '../Components/Footer';
import { isAuthorized } from '../api/isAuthorized';
import PageHeader from '../Components/PageHeader';
import '../style/adminPage.css';
import '../style/dataTable.css';
import { ROLE_ADMIN, ROLE_MODERATOR } from '../utils';


export default class ModeratorPage extends React.Component{
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
        if(typeof response === 'object') {
            if(response.data_status === 'role' && response.role > 0) {
                /** response correct - user is admin or moderator */
                if( [ROLE_ADMIN,ROLE_MODERATOR].includes(parseInt(response.role)) ) {
                    this.setState({
                        displayDashboard: 'block'
                    });    
                }
                else {
                    /** user is simple user */
                    this.setState({ 
                        redirect: true
                    });
                }
            }
        }
        else {
            /** not authorized or get param authorized */
            this.setState({ 
                redirect: true
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