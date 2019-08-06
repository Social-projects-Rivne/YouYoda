import React from 'react';

import {TabContent, TabPane, Nav, NavItem, NavLink, Card, Button,
   CardTitle, CardText, Row, Col, Container } from 'reactstrap';
import classnames from 'classnames';

export default class UserCourses extends React.Component {
  constructor(props) {
  super(props);

  this.toggle = this.toggle.bind(this);
  this.state = {
      activeTab: '1',
      activeTabColor: 'white'
    }
  }

  handleClickTab() {
    this.setState({
      activeTabColor: '#ffd466'
    })
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  render() {
    return (
      <Container>
        <Row>
          <Col md="3">
            <Nav className="user-courses" tabs vertical>
              <NavItem className="tab-item">
                <NavLink
                  className={classnames({ active: this.state.activeTab === '1' })}
                  onClick={() => { this.toggle('1'); this.handleClickTab()}}
                  style={{backgroundColor:this.state.activeTab}}>
                  <span id="following-courses">Following</span>
                </NavLink>
              </NavItem>
              <NavItem className="tab-item">
                <NavLink
                  className={classnames({ active: this.state.activeTab === '2' })}
                  onClick={() => { this.toggle('2'); this.handleClickTab()}}
                  style={{backgroundColor:this.state.activeTab}}>
                  <span id="completed-courses">Completed</span>
                </NavLink>
              </NavItem>
              <NavItem className="tab-item">
                <NavLink
                  className={classnames({ active: this.state.activeTab === '3' })}
                  onClick={() => { this.toggle('3'); this.handleClickTab()}}
                  style={{backgroundColor:this.state.activeTab}}>
                  <span id="favorites-courses">Favorites</span>
                </NavLink>
              </NavItem>
            </Nav>
          </Col>
          <Col>
            <TabContent md="9" activeTab={this.state.activeTab}>
              <TabPane tabId="1">
                <Row>
                  <Col sm="12">
                    <h4>Tab 1 Contents</h4>
                  </Col>
                </Row>
              </TabPane>
              <TabPane tabId="2">
                <Row>
                  <Col sm="6">
                    <Card body>
                      <CardTitle>Special Title Treatment</CardTitle>
                      <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                      <Button>Go somewhere</Button>
                    </Card>
                  </Col>
                  <Col sm="6">
                    <Card body>
                      <CardTitle>Special Title Treatment</CardTitle>
                      <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                      <Button>Go somewhere</Button>
                    </Card>
                  </Col>
                </Row>
              </TabPane>
            </TabContent>
          </Col>
        </Row>
      </Container>
    );
  }
}
