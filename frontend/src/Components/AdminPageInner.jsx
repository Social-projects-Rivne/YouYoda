import React from 'react';
import { slide as Menu } from 'react-burger-menu'
import { Switch, Route } from 'react-router-dom';
import { NavItem, NavLink, Row, Col, Container } from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import AdminLogs from './AdminLogs';
import AdminRequests from './AdminRoleRequests';
import AdminUsers from './AdminUsers';
import UsersStatuses from './AdminUsersStatuses';


const PAGES = [
  {option: 'users', name: "Manage users", title: "Users List", icon: <FontAwesomeIcon icon="users"/>},
  {option: 'statuses', name: "Users' statuses", title: "Statuses", icon: <FontAwesomeIcon icon="user-slash"/>},
  {option: 'roles', name: "Role requests", title: "Roles", icon: <FontAwesomeIcon icon="user-graduate"/>},
  {option: 'logs', name: "Log list", title: "Last Logs", icon: <FontAwesomeIcon icon="list-alt"/>}
];

export default class AdminPageInner extends React.Component {
    render() {
      return (
          <div className="admin-left-menu" id="admin-left-menu">
            <div className="wrapper" id="wrapper">
                <Menu>
                  {
                    PAGES.map(function(item){
                        return <NavItem className="menu-item" key={item.option}>
                                  <NavLink href={`/admin/${item.option}`} title={item.title}>{item.icon} {item.name}</NavLink>
                               </NavItem>
                    })
                  }
                  </Menu>
            <Container id="admin-dashboard">
                <Row>
                    <Col md="10">
                        <Switch>
                            <Route exact path='/admin/users' component={AdminUsers}/>
                            <Route exact path='/admin/statuses' component={UsersStatuses}/>
                            <Route exact path='/admin/logs' component={AdminLogs}/>
                            <Route exact path='/admin/roles' component={AdminRequests}/>
                        </Switch>
                    </Col>
                </Row>
            </Container>
            </div>
          </div>
      );
  }
}