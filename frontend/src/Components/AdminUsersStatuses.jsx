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
            selected: {"users": '', "status": ''}
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
        switch(sv){
            case "Active": sv = 1;
            case "Banned": sv = 2;
            case "Muted": sv = 3;
            case "Idle": sv = 4;
        }
        this.state.selected.status = sv;
        this.state.selected.users = uv;

        toast.error('user_id: ' + uv + '; status_id: ' + sv);
    }

    getEditedUsers = () => {
        var itemIds = {};
        this.state.checkedComments.map(number => {
            var commentValue = document.getElementById('comment_'+number).value;
             itemIds[number] = {'id':number, 'comment':commentValue};
        });
        return itemIds;
    }

    getArrayWithComments = () => {
        var itemIds = {};
        this.state.checkedComments.map(number => {
            var commentValue = document.getElementById('comment_'+number).value;
             itemIds[number] = {'id':number, 'comment':commentValue};
        });
        return itemIds;
    }

    saveEditedData = async() => {
        var objIdsComments = this.getArrayWithComments();
        var objIdsComments = this.getArrayWithComments();
        var userData = {
            "users": 'A',
            "is_trainer": true,
            "id": this.state.checkedIds,
            "data_obj": objIdsComments
        };
        var response = patchRequests(userData);
        response.then( valueResponse => {
            if(valueResponse === true)
            {
                this.updateRequestTable();
                toast.success('Requests successfully was approved.');
            }
            else
                toast.error('Request failed. Report to the admin of the system.');
        });
    }

    updateStatusHistory = async() => {
        var objIdsComments = this.getArrayWithComments();
        var objIdsComments = this.getArrayWithComments();
        var userData = {
            "users": 'A',
            "is_trainer": true,
            "id": this.state.checkedIds,
            "data_obj": objIdsComments
        };
        var response = patchRequests(userData);
        response.then( valueResponse => {
            if(valueResponse === true)
            {
                this.updateRequestTable();
                toast.success('Requests successfully was approved.');
            }
            else
                toast.error('Request failed. Report to the admin of the system.');
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
                        <DropdownToggle id={user.id} tag="button" type="button" value={this.state.selected.status} caret>
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
                            <DropdownItem onClick={this.handleChange("Active", user.id)}>Active</DropdownItem>
                            <DropdownItem onClick={this.handleChange("Banned", user.id)}>Banned</DropdownItem>
                            <DropdownItem onClick={this.handleChange("Muted", user.id)}>Muted</DropdownItem>
                            <DropdownItem onClick={this.handleChange("Idle", user.id)}>Idle</DropdownItem>
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
                        <Button type="button">Apply edited data</Button>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default UsersStatuses;