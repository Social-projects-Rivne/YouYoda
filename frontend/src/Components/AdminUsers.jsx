import React from 'react';

import {Row, Col} from "reactstrap";
import Button from 'reactstrap/es/Button';
import { UncontrolledButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { toast } from 'react-toastify';

import {getUsersList, patchRequests} from '../api/getAdminUsers';
import {ROLES} from './AdminDashboard';
import { defaultPhoto, DEFAULT_AVATAR_URL } from '../utils'


class AdminUsers extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dataList: [],
            checkedIds: [],
            checkedRoles: [],
            checkedIsTrainer: [],
            checkedFirstName: [],
            checkedLastName: [],
            checkedUsername: [],
            checkedPhone: [],
            inputPhone: {},
            list: [{}],
            able: true
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

    selectedToState(e) {        
        if(e.target.selected){
            return true;
        }
        return false;
    }
    handleChangeInput=(user_id, e) => {
        let name = e.target.name;
        let value = e.target.value;
        let list = this.state.list;

        for( let i = 0; i < list.length; i++){ 
            if ( list[i].id == user_id) {
               list[i][name] = value;
            } else {
                this.setState({
                    list: [
                    ...this.state.list,
                    {
                        id: user_id,
                        [name]: value
                    }
                ],
                });
            }
         }
    }
    handleChange=(role_id_value, user_id_value) => {
        this.setState({
            
        });
        document.getElementById(user_id_value).textContent = ROLES[role_id_value];
    }

    saveEditedData = async() => {
        var userData = {
            "id": this.state.checkedIds,
            "role_id": this.state.checkedRoles,
            "is_trainer": this.state.checkedIsTrainer,
            "first_name": this.state.checkedFirstName,
            "last_name": this.state.checkedLastName,
            "username": this.state.checkedUsername,
            "phone_number": this.state.checkedPhone
        };
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
        let coverImg = defaultPhoto(DEFAULT_AVATAR_URL, user.avatar_url);
        return (
            <tr id={`user_${user.id}`} key={user.id}>
                <td align="center"><input type="checkbox" value={user.id} onClick={(e)=>{this.selectedToState(e)}} /></td>
                <td align="center"><input type="checkbox" checked={user.is_trainer} onClick="this.checked=!this.checked" /></td>
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
                <td className="username-td"><input disabled={(e)=>{this.selectedToState(e)}} onChange={(e)=>this.handleChangeInput(user.id, e)} name="username" value={user.username}></input></td>
                <td className="date-td">{user.birth_date}</td>
                <td className="phone-td"><input disabled={(e)=>{this.selectedToState(e)}} onChange={(e)=>this.handleChangeInput(user.id, e)} name="phone_number" value={user.phone_number}></input></td>
                <td>{user.location}</td>
                <td><img width="40" height="40" src={coverImg} alt={user.username} /></td>
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