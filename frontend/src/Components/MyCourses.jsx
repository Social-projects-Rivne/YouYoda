import React from 'react';

import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button,
   CardTitle, CardText, Row, Col, Container } from 'reactstrap';
import classnames from 'classnames';


export default class MyCourses extends React.Component{
    constructor(props) {
      super(props);
      this.state = {
        activeTab: '1'
      };
    }

    toggle = (tab) => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
        });
      }
    }

    render (){
        return(
            <Container>
              <Row>
                <Col>
                  <h2 className="page-title">Courses</h2>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Nav style={{marginTop:"10px"}}>
                    <NavItem>
                      <NavLink
                        className={classnames({ active: this.state.activeTab === '1' })} tab-link
                        onClick={() => { this.toggle('1'); }}>
                        <h5 className="trainer-tabs">Courses</h5>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({ active: this.state.activeTab === '2' })} tab-link
                        onClick={() => { this.toggle('2'); }}>
                        <h5 className="trainer-tabs">Events</h5>
                      </NavLink>
                    </NavItem>
                  </Nav>
                </Col>
                <Col lg="2">
                  <Button className="btn-new-course">New course</Button>
                </Col>
              </Row>
              <hr className="h-line"/>
              <Row>
                <Col>
                  <TabContent activeTab={this.state.activeTab}>
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
        )
    }
};
