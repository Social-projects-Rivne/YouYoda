import React from 'react';

import { UncontrolledButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import {Row, Col} from "reactstrap";
import Button from 'reactstrap/es/Button';
import { toast } from 'react-toastify';

import {getUsersStatusesList, patchRequests} from '../api/getUsersStatuses';


const ROLES = {1: "User", 2: "Moderator", 3: "Admin"};
const STATUSES = {1: "Active", 2: "Banned", 3: "Muted", 4: "Idle"};

class UsersStatuses extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dataList: [],
            selected: {}
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

    handleChange=(status_id_value, user_id_value) => {
        this.state.selected[user_id_value] = status_id_value;
        document.getElementById(user_id_value).textContent = STATUSES[status_id_value];
        toast.error('user_id: ' + user_id_value + '; status_id: ' + STATUSES[status_id_value]);
    }

    saveEditedData = async() => {
        var userData = this.state.selected;
        var response = patchRequests(userData);
        response.then( valueResponse => {
            if(valueResponse)
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
                <td>{ ROLES[user.role_id] }</td>
                <td>{user.email}</td>
                <td align="center"><input type="checkbox" checked={user.is_active} /></td>
                <td> 
                    <UncontrolledButtonDropdown>
                        <DropdownToggle id={user.id} tag="button" type="button" caret>
                            { STATUSES[user.status_id] }
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem onClick={()=>{this.handleChange(Object.keys(STATUSES)[0], user.id)}}>Active</DropdownItem>
                            <DropdownItem onClick={()=>{this.handleChange(Object.keys(STATUSES)[1], user.id)}}>Banned</DropdownItem>
                            <DropdownItem onClick={()=>{this.handleChange(Object.keys(STATUSES)[2], user.id)}}>Muted</DropdownItem>
                            <DropdownItem onClick={()=>{this.handleChange(Object.keys(STATUSES)[3], user.id)}}>Idle</DropdownItem>
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
                                {this.state.dataList.map((user)=>this.renderUsers(user) )}
                            </tbody>
                        </table>
                        
                    </Col>
                </Row>
                <Row className="table-actions mt-3">
                    <Col>
                        <Button type="button" onClick={()=>{this.saveEditedData()}}>Apply edited data</Button>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default UsersStatuses;