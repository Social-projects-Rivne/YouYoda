import React from 'react';

import {Container, Row, Col} from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


class ModeratorDashboard extends React.Component {
    render() {
        return (
            <Container id="moderator-dashboard">
                <Row>
                    <Col md="12"><h2>Moderator Dashboard</h2></Col>
                </Row>
                <Row className="dashboard-menu">
                    <Col md="6" className="pb-3">
                        <a href="/moderator/users">
                            <div>Manage Users<div><FontAwesomeIcon icon="users" size="5x"/></div></div>
                        </a>
                    </Col>
                    <Col md="6" className="pb-3">
                        <a href="/moderator/statuses">
                            <div>Users' statuses<div><FontAwesomeIcon icon="user-slash" size="5x"/></div></div>
                        </a>
                    </Col>
                    <Col md="6" className="pb-3">
                        <a href="/moderator/roles">
                            <div>Role requests<div><FontAwesomeIcon icon="user-graduate" size="5x"/></div></div>
                        </a>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default ModeratorDashboard;