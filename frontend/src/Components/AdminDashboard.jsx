import React from 'react';

import {Container, Row, Col} from "reactstrap";


class AdminDashboard extends React.Component {
    render() {
        return (
            <Container id="admin-dashboard">
                <Row>
                    <Col md="12"><h2>Admin Dashboard</h2></Col>
                </Row>
                <Row className="dashboard-menu">
                    <Col md="6" className="pb-3"><a href="/admin/users"><div>Users</div></a></Col>
                    <Col md="6" className="pb-3"><a href="/admin/statuses"><div>Users' statuses</div></a></Col>
                    <Col md="6" className="pb-3"><a href="/admin/roles"><div>Role requests</div></a></Col>
                    <Col md="6" className="pb-3"><a href="/admin/logs"><div>Logs</div></a></Col>
                </Row>
            </Container>
        );
    }
}

export default AdminDashboard;