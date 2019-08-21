import React from 'react';

import {Container, Row, Col} from "reactstrap";
import {Redirect} from 'react-router-dom';

import {isAuthorized} from '../api/isAuthorized'


class AdminDashboard extends React.Component {
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
        
    render() {
        const { redirect, redirectTo, displayDashboard } = this.state;
        if (redirect) {
            return <Redirect to={redirectTo}/>;
        }
        return (
            <Container id="admin-dashboard" style={{display:displayDashboard}}>
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