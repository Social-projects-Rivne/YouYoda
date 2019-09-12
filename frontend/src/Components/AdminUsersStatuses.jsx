import React from 'react';

import { UncontrolledButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import {Row, Col} from "reactstrap";
import Button from 'reactstrap/es/Button';

import {getUsersStatusesList} from '../api/getUsersStatuses';


class UsersStatuses extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dataList: []
        };
    }

    componentWillMount() {
        var statusesList = getUsersStatusesList();
        statusesList.then( valueUsers => {
            this.setState({
                dataList: valueUsers,
            });  
        });
    }

    renderUsers(user) {
        return (
            <tr id={`user_${user.id}`} key={user.id}>
                <td>{user.id}</td>
                <td>
                {(() => {
                    var roleId = user.role_id
                    switch (roleId) {
                      case 1: return "User(1)";
                      case 2: return "Moderator(2)";
                      case 3: return "Admin(3)";
                    }
                })()}
                </td>
                <td>{user.email}</td>
                <td align="center"><input type="checkbox" checked={user.is_active} /></td>
                <td> 
                    <UncontrolledButtonDropdown>
                        <DropdownToggle tag="button" type="button" caret>
                            {
                                (() => {
                                    var statusId = user.status_id
                                    switch (statusId) {
                                      case 1: return "Active";
                                      case 2: return "Banned";
                                      case 3: return "Muted";
                                      case 4: return "Idle";
                                    }
                            })()}
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem>Active</DropdownItem>
                            <DropdownItem>Banned</DropdownItem>
                            <DropdownItem>Muted</DropdownItem>
                            <DropdownItem>Idle</DropdownItem>
                        </DropdownMenu>
                    </UncontrolledButtonDropdown> 
                </td>
            </tr>
        )
    }

    render() {
        return (
            <div id="users-table" className="admin-tables">
                <Row>
                    <Col><h5>Users Table</h5></Col>
                </Row>
                <Row className="users-table">
                    <Col className="users-table-wrap">
                        <table width="100%" border="1" cellPadding="5">
                            <thead>
                                <tr>
                                    <th>User ID</th>
                                    <th>Role Id</th>
                                    <th>Email</th>
                                    <th>Is Active</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.dataList.map( (user) => this.renderUsers(user) )}
                            </tbody>
                        </table>
                        
                    </Col>
                </Row>
                <Row className="table-actions mt-3">
                    <Col>
                        <Button type="button">Apply edited data</Button>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default UsersStatuses;