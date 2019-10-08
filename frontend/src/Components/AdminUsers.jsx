import React from 'react';

import {Row, Col} from "reactstrap";
import Button from 'reactstrap/es/Button';
import { UncontrolledButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { toast } from 'react-toastify';

import {getUsersList, patchRequests} from '../api/getAdminUsers';
import {ROLES} from './AdminDashboard';


class AdminUsers extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dataList: [],
        };
    }

    componentWillMount() {
        var usersList = getUsersList();
        usersList.then( valueUsers => {
            this.setState({
                dataList: valueUsers,
            });  
        });
    }

    handleChange=(role_id_value, user_id_value) => {
        document.getElementById(user_id_value).textContent = ROLES[role_id_value];
    }

    saveEditedData = async() => {
        var userData = this.state.selected;
        var response = patchRequests(userData);
        response.then( valueResponse => {
            if(valueResponse)
            {
                toast.success('Users data successfully saved');
            }
            else
                toast.error('Data saving is failed');
        });
    }

    renderUsers(user) {
        if(!user.avatar_url)
            user.avatar_url = require('../img/content/profile_photo.png');
        return (
            <tr id={`user_${user.id}`} key={user.id}>
                <td align="center"><input type="checkbox" /></td>
                <td align="center"><input type="checkbox" checked={user.is_trainer} /></td>
                <td>
                <UncontrolledButtonDropdown>
                        <DropdownToggle id={user.id} tag="button" type="button" caret>
                            { ROLES[user.role_id] }
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem onClick={()=>{this.handleChange(Object.keys(ROLES)[0], user.id)}}>User</DropdownItem>
                            <DropdownItem onClick={()=>{this.handleChange(Object.keys(ROLES)[1], user.id)}}>Moderator</DropdownItem>
                            <DropdownItem onClick={()=>{this.handleChange(Object.keys(ROLES)[2], user.id)}}>Admin</DropdownItem>
                        </DropdownMenu>
                </UncontrolledButtonDropdown> 
                </td>
                <td>{user.id}</td>
                <td>{user.email}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td className="username-td">{user.username}</td>
                <td className="date-td">{user.birth_date}</td>
                <td className="phone-td">{user.phone_number}</td>
                <td>{user.location}</td>
                <td><img width="40" height="40" src={user.avatar_url} alt={user.username} /></td>
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
                                    <th>Select</th>
                                    <th>Trainer</th>
                                    <th>Role</th>
                                    <th>ID</th>
                                    <th>Email</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Username</th>
                                    <th>Birth Date</th>
                                    <th>Phone Number</th>
                                    <th>Location</th>
                                    <th>Avatar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.dataList.map( user => this.renderUsers(user) )}
                            </tbody>
                        </table>
                    </Col>
                </Row>
                <Row className="table-actions mt-3">
                    <Col>
                        <Button type="button" onClick={()=>{this.saveEditedData()}}>Edit selected items</Button>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default AdminUsers;