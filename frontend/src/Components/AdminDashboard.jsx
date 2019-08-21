import React from 'react';

import {Container, Row, Col} from "reactstrap";
import {Redirect} from 'react-router-dom';

import {isAuthorized} from '../api/isAuthorized'
//import {getUserRole} from '../api/getUserRole'


class AdminDashboard extends React.Component {
    constructor(props){
    	super(props);

    	this.state = { redirect: false, };
	}

    async checkUser() {
        await isAuthorized()
            .then(function (response) {
                if(response === null) {
                    /*this.setState({ 
                        redirect: true
                    });*/
                    console.log('You are not authorized');
                }
                else {
                    console.log(response);
                }

            });
    }
    
    render() {
        this.checkUser();
        const { redirect } = this.state;
        if (redirect) {
            //this.props.handleClickLogin();
            return <Redirect to='/'/>;
        }
        return (
            <Container id="admin-dashboard">
                <Row>
                    <Col md="12"><h2>Admin Dashboard</h2></Col>
                </Row>
                <Row className="dashboard-menu">
                    <Col md="6" className="pb-3"><a href="/admin/users"><div>Users</div></a></Col>
                    <Col md="6" className="pb-3"><a href="/admin/roles"><div>Roles</div></a></Col>
                    <Col md="6" className="pb-3"><a href="/admin/logs"><div>Logs</div></a></Col>
                    <Col md="6" className="pb-3"><a href="/admin/some"><div>Something else</div></a></Col>
                </Row>
            </Container>
        );
    }
}

export default AdminDashboard;