import React from 'react';

import {Container, Row, Col} from "reactstrap";


class AdminUsers extends React.Component {
    render() {
        console.log(this.props);
        return (
            <Container id="users-table">
                <Row>
                    <Col md="12"><h5>Users Table</h5></Col>
                </Row>
                <Row className="users-table">
                    <Col md="12">Users</Col>
                </Row>
                
            </Container>
        );
    }
}

export default AdminUsers;