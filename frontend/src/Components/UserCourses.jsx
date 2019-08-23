import React from 'react';

import {TabContent, TabPane, Nav, NavItem, NavLink, Card, Button,
   CardTitle, CardText, CardImg, Row, Col, Container } from 'reactstrap';
import classnames from 'classnames';


export default class UserCourses extends React.Component {
  constructor(props) {
  super(props);

  this.toggle = this.toggle.bind(this);
  this.state = {
      activeTab: '1'
    }
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
            <Nav className="tabs-user-courses" vertical>
              <NavItem className="tab-item">
                <NavLink
                  className={classnames({ active: this.state.activeTab === '1' })} tab-link
                  onClick={() => { this.toggle('1');}}>
                  <div className="user-courses">Following
                    <div id="number-following-courses">17</div>
                  </div>
                </NavLink>
              </NavItem>
              <NavItem className="tab-item">
                <NavLink
                  className={classnames({ active: this.state.activeTab === '2' })} tab-link
                  onClick={() => { this.toggle('2');}}>
                  <div className="user-courses">Completed
                    <div id="number-completed-courses">20</div>
                  </div>
                </NavLink>
              </NavItem>
              <NavItem className="tab-item">
                <NavLink
                  className={classnames({ active: this.state.activeTab === '3' })} tab-link
                  onClick={() => { this.toggle('3');}}>
                  <div className="user-courses">Favorites
                    <div id="number-favorites-courses">60</div>
                  </div>
                </NavLink>
              </NavItem>
              <NavItem className="tab-item">
                <NavLink className="tab-link" href="#">
                  <div className="pdp">Personal Development Plan</div>
                </NavLink>
              </NavItem>
            </Nav>
          </Col>
          <Col>
            <TabContent md="9" activeTab={this.state.activeTab}>
              <TabPane tabId="1">
                <Row>
                  <Col>
                    <Card className="card" body>
                      <CardImg top width="100%" src={require('../img/static/course-image.png')}
                        className="course-image" alt="course-image" />
                      <div className="description-background"></div>
                        <Row>
                          <Col xs="12" md="9">
                            <CardText className="course-description">With supporting text below as a natural lead-in to additional content.
                            </CardText>
                          </Col>
                          <Col xs="12" md="3">
                            <div className="join-course-container">
                              <Button className="join-course">Join</Button>
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <div>
                              <div className="rating">
                                <span className="add-favorites" href="#">Add to favorites</span>
                                <span>Rating: </span>
                                <span className="course-rating">143</span>
                              </div>
                              <div className="course-tools">
                                <span>...</span>
                                <span href="#">
                                  <img src={require('../img/static/course-tool.png')}
                                  className="tool-plane"alt="course-plane"/>
                                </span>
                              </div>
                            </div>
                          </Col>
                        </Row>
                    </Card>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Card className="card" body>
                      <CardImg top width="100%" src={require('../img/static/course-image.png')}
                        className="course-image" alt="course-image" />
                      <div className="description-background"></div>
                        <Row>
                          <Col xs="12" md="9">
                            <CardText className="course-description">With supporting text below as a natural lead-in to additional content.
                            </CardText>
                          </Col>
                          <Col xs="12" md="3">
                            <div className="join-course-container">
                              <Button className="join-course">Join</Button>
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <div>
                              <div className="rating">
                                <span className="add-favorites" href="#">Add to favorites</span>
                                <span>Rating: </span>
                                <span className="course-rating">143</span>
                              </div>
                              <div className="course-tools">
                                <span>...</span>
                                <span href="#">
                                  <img src={require('../img/static/course-tool.png')}
                                  className="tool-plane"alt="course-plane"/>
                                </span>
                              </div>
                            </div>
                          </Col>
                        </Row>
                    </Card>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Card className="card" body>
                      <CardImg top width="100%" src={require('../img/static/course-image.png')}
                        className="course-image" alt="course-image" />
                      <div className="description-background"></div>
                        <Row>
                          <Col xs="12" md="9">
                            <CardText className="course-description">With supporting text below as a natural lead-in to additional content.
                            </CardText>
                          </Col>
                          <Col xs="12" md="3">
                            <div className="join-course-container">
                              <Button className="join-course">Join</Button>
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <div>
                              <div className="rating">
                                <span className="add-favorites" href="#">Add to favorites</span>
                                <span>Rating: </span>
                                <span className="course-rating">143</span>
                              </div>
                              <div className="course-tools">
                                <span>...</span>
                                <span href="#">
                                  <img src={require('../img/static/course-tool.png')}
                                  className="tool-plane"alt="course-plane"/>
                                </span>
                              </div>
                            </div>
                          </Col>
                        </Row>
                    </Card>
                  </Col>
                </Row>
              </TabPane>
              <TabPane tabId="2">
                <Row>
                  <Col>
                    <Card className="card" body>
                      <CardImg top width="100%" src={require('../img/static/course-image.png')}
                        className="course-image" alt="course-image" />
                      <div className="description-background"></div>
                        <Row>
                          <Col xs="12" md="9">
                            <CardText className="course-description">With supporting text below as a natural lead-in to additional content.
                            </CardText>
                          </Col>
                          <Col xs="12" md="3">
                            <div className="join-course-container">
                              <Button className="join-course">Join</Button>
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <div>
                              <div className="rating">
                                <span className="add-favorites" href="#">Add to favorites</span>
                                <span>Rating: </span>
                                <span className="course-rating">143</span>
                              </div>
                              <div className="course-tools">
                                <span>...</span>
                                <span href="#">
                                  <img src={require('../img/static/course-tool.png')}
                                  className="tool-plane"alt="course-plane"/>
                                </span>
                              </div>
                            </div>
                          </Col>
                        </Row>
                    </Card>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Card className="card" body>
                      <CardImg top width="100%" src={require('../img/static/course-image.png')}
                        className="course-image" alt="course-image" />
                      <div className="description-background"></div>
                        <Row>
                          <Col xs="12" md="9">
                            <CardText className="course-description">With supporting text below as a natural lead-in to additional content.
                            </CardText>
                          </Col>
                          <Col xs="12" md="3">
                            <div className="join-course-container">
                              <Button className="join-course">Join</Button>
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <div>
                              <div className="rating">
                                <span className="add-favorites" href="#">Add to favorites</span>
                                <span>Rating: </span>
                                <span className="course-rating">143</span>
                              </div>
                              <div className="course-tools">
                                <span>...</span>
                                <span href="#">
                                  <img src={require('../img/static/course-tool.png')}
                                  className="tool-plane"alt="course-plane"/>
                                </span>
                              </div>
                            </div>
                          </Col>
                        </Row>
                    </Card>
                  </Col>
                </Row>
              </TabPane>
              <TabPane tabId="3">
                <Row>
                  <Col>
                    <Card className="card" body>
                      <CardImg top width="100%" src={require('../img/static/course-image.png')}
                        className="course-image" alt="course-image" />
                      <div className="description-background"></div>
                        <Row>
                          <Col xs="12" md="9">
                            <CardText className="course-description">With supporting text below as a natural lead-in to additional content.
                            </CardText>
                          </Col>
                          <Col xs="12" md="3">
                            <div className="join-course-container">
                              <Button className="join-course">Join</Button>
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <div>
                              <div className="rating">
                                <span className="add-favorites" href="#">Add to favorites</span>
                                <span>Rating: </span>
                                <span className="course-rating">143</span>
                              </div>
                              <div className="course-tools">
                                <span>...</span>
                                <span href="#">
                                  <img src={require('../img/static/course-tool.png')}
                                  className="tool-plane"alt="course-plane"/>
                                </span>
                              </div>
                            </div>
                          </Col>
                        </Row>
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
