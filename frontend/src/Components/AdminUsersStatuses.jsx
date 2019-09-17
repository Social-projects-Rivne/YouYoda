import React from 'react';

import { UncontrolledButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import {Row, Col} from "reactstrap";
import Button from 'reactstrap/es/Button';
import { toast } from 'react-toastify';

import {getUsersStatusesList, patchRequests} from '../api/getUsersStatuses';


class UsersStatuses extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dataList: [],
            ids: [],
            status_ids: []
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

    handleChange=(sv, uv) => {
        var ids = this.state.ids;
        var status_ids = this.state.status_ids;

        ids.push(uv);
        status_ids.push(sv);

        this.setState({
            ids: ids,
            status_ids: status_ids
        });

        document.getElementById(uv).textContent = sv;
        toast.error('user_id: ' + uv + '; status_id: ' + sv);
    }

    saveEditedData = async() => {
        var userData = {
            "users": {
                "id": this.state.ids,
                "status_id": this.state.status_ids
            }
        };
        var response = patchRequests(userData);
        response.then( valueResponse => {
            if(valueResponse === true)
            {
                toast.success('Users \' statuses successfully saved');
            }
            else
                toast.error('Data saving is failed');
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
                        <DropdownToggle id={user.id} tag="button" type="button" caret>
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
                            <DropdownItem onClick={ () => { this.handleChange("Active", user.id)}}>Active</DropdownItem>
                            <DropdownItem onClick={ () => { this.handleChange("Banned", user.id)}}>Banned</DropdownItem>
                            <DropdownItem onClick={ () => { this.handleChange("Muted", user.id)}}>Muted</DropdownItem>
                            <DropdownItem onClick={ () => { this.handleChange("Idle", user.id)}}>Idle</DropdownItem>
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
                    <Col><h5>Users' Statuses Table</h5></Col>
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
                        <Button type="button" onClick={  () => { this.saveEditedData()}}>Apply edited data</Button>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default UsersStatuses;