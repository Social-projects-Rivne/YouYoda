import React from 'react';

import {Row, Col} from "reactstrap";


class AdminLogs extends React.Component {
    render() {
        return (
            <div id="logs-table">
                <Row>
                    <Col><h5>Last Log Table</h5></Col>
                </Row>
                <Row>
                    <Col>
                        Logs will be here
                    </Col>
                </Row>
            </div>
        );
    }
}

export default AdminLogs;