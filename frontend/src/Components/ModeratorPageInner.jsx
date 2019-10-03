import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Nav, NavItem, NavLink, Row, Col, Container } from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import AdminRequests from './AdminRoleRequests';
import AdminUsers from './AdminUsers';
import UsersStatuses from './AdminUsersStatuses';


const PAGES = [
  {option: 'users', name: "Manage users", title: "Users List", icon: <FontAwesomeIcon icon="users"/> },
  {option: 'statuses', name: "Users' statuses", title: "Statuses", icon: <FontAwesomeIcon icon="user-slash"/>},
  {option: 'roles', name: "Role requests", title: "Roles", icon: <FontAwesomeIcon icon="user-graduate"/>}
];

export default class ModeratorPageInner extends React.Component {
  render() {
      return (
          <Container id="moderator-dashboard">
              <Row>
                  <Col md="12"><h2>Moderator Dashboard</h2></Col>
              </Row>
              <Row>
                  <Col md="2">
                      <Nav className="admin-left-menu" vertical>
                      {
                        PAGES.map(function(item){
                            return <NavItem className="menu-item" key={item.option}>
                                      <NavLink href={`/moderator/${item.option}`} title={item.title}>{item.icon} {item.name}</NavLink>
                                   </NavItem>
                        })
                      }
                      </Nav>
                  </Col>
                  <Col md="10">
                      <Switch>
                          <Route exact path='/moderator/users' component={AdminUsers}/>
                          <Route exact path='/moderator/statuses' component={UsersStatuses}/>
                          <Route exact path='/moderator/roles' component={AdminRequests}/>
                      </Switch>
                  </Col>
              </Row>
          </Container>
      );
  }
}