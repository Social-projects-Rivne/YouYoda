import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Nav, NavItem, NavLink, Row, Col, Container } from 'reactstrap';

import AdminUsers from './AdminUsers';
import AdminLogs from './AdminLogs';


const PAGES = [
  {option: 'users', name: "Users", title: "Users List"},
  {option: 'logs', name: "Logs", title: "Last Logs"}
];

export default class AdminPageInner extends React.Component {
  render() {
      return (
          <Container id="admin-dashboard">
              <Row>
                  <Col md="12"><h2>Admin Dashboard</h2></Col>
              </Row>
              <Row>
                  <Col md="2">
                      <Nav className="admin-left-menu" vertical>
                      {
                        PAGES.map(function(item){
                            return <NavItem className="menu-item" key={item.option}>
                                      <NavLink href={`/admin/${item.option}`} title={item.title}>{item.name}</NavLink>
                                   </NavItem>
                        })
                      }
                      </Nav>
                  </Col>
                  <Col md="10">
                      <Switch>
                          <Route exact path='/admin/users' component={AdminUsers}/>
                          <Route exact path='/admin/logs' component={AdminLogs}/>
                      </Switch>
                  </Col>
              </Row>
          </Container>
      );
  }
}