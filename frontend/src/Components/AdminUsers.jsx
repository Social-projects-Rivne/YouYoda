import React from 'react';

import ClipLoader from 'react-spinners/ClipLoader';
import { css } from '@emotion/core';
import {Row, Col} from "reactstrap";
import Button from 'reactstrap/es/Button';

import {getUsersList} from '../api/getAdminUsers';
import { defaultPhoto, DEFAULT_AVATAR_URL } from '../utils'


const override = css`
    display: block;
    margin: 0 auto;
    border-color: #FFD466;
`;

class AdminUsers extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dataList: [],
            loading: true
        };
    }

    componentWillMount() {
        var usersList = getUsersList();
        usersList.then( valueUsers => {
            this.setState({
                dataList: valueUsers,
                loading: false
            });  
        })
    }

    renderUsers(user) {
        let coverImg = defaultPhoto(DEFAULT_AVATAR_URL, user.avatar_url);
        return (
            <tr id={`user_${user.id}`} key={user.id}>
                <td align="center"><input type="checkbox" /></td>
                <td align="center"><input type="checkbox" checked={user.is_active} /></td>
                <td align="center"><input type="checkbox" checked={user.is_trainer} /></td>
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
                <td>{user.id}</td>
                <td>{user.email}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td className="username-td">{user.username}</td>
                <td className="date-td">{user.birth_date}</td>
                <td className="phone-td">{user.phone_number}</td>
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
                                    <th>Active</th>
                                    <th>Trainer</th>
                                    <th>RoleId</th>
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
                                <div className='sweet-loading'>
                                    <ClipLoader
                                        css={override}
                                        sizeUnit={"px"}
                                        size={150}
                                        color={'#123abc'}
                                        loading={this.state.loading}
                                    />
                                </div>
                            </tbody>
                        </table>
                    </Col>
                </Row>
                <Row className="table-actions mt-3">
                    <Col>
                        <Button type="button">Edit selected items</Button>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default AdminUsers;