import React from 'react';

import {Container, Row, Col, CardTitle, CardText, CardImg, Card, Collapse,
  Nav, NavItem, NavLink, TabContent, TabPane} from 'reactstrap';
import classnames from 'classnames';
import {ProfileContext} from './profile-context';
import Course from './Course'
import Achievement from './Achievement'


export default class ProfileInfo extends React.Component {
    constructor(props) {
      super(props);
      this.toggle = this.toggle.bind(this);
      this.toggleAchievement = this.toggleAchievement.bind(this);
      this.toggleTab = this.toggleTab.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.backButton = (
        <div onClick={this.handleChange}>
          <img src={require("../img/content/left-arrow.png")}
          alt="left-arrow" className="left-arrow back"/>
          <div className="user-courses-profile back" href="#" style={{marginLeft:"5px"}}>Back to profile</div>
        </div>
      );
      this.state = {
         activeTab: '1',
         collapse: false,
         achievementCollapse: false,
         toggleName: 'Show all',
         achievementToggleName: 'Show all',
         hideButton: true,
         achievements: [
           {
             text: 'Achievement name',
           },
           {
             text: 'Achievement name',
           },
           {
             text: 'Achievement name',
           },
           {
             text: 'Achievement name',
           },
           {
             text: 'Achievement name',
           },
           {
             text: 'Achievement name',
           },
           {
             text: 'Achievement name',
           },
           {
             text: 'Achievement name',
           },
           {
             text: 'Achievement name',
           },
           {
             text: 'Achievement name',
           },
           {
             text: 'Achievement name',
           },
           {
             text: 'Achievement name',
           },
           {
             text: 'Achievement name',
           },
           {
             text: 'Achievement name',
           },
           {
             text: 'Achievement name',
           },
        ],
        courses: [
            {
              description: 'Course 1 With supporting text below as a natural lead-in to additional content.'
            },
            {
              description: 'Course 2 With supporting text below as a natural lead-in to additional content.'
            },
            {
              description: 'Course 3 With supporting text below as a natural lead-in to additional content.'
            },
            {
              description: 'Course 4 With supporting text below as a natural lead-in to additional content.'
            },
            {
              description: 'Course 5 With supporting text below as a natural lead-in to additional content.'
            },
            {
              description: 'Course 6 With supporting text below as a natural lead-in to additional content.'
            },
            {
              description: 'Course 7 With supporting text below as a natural lead-in to additional content.'
            },
            {
              description: 'Course 8 With supporting text below as a natural lead-in to additional content.'
            },
            {
              description: 'Course 9 With supporting text below as a natural lead-in to additional content.'
            },
        ]
      };
    }

    toggle() {
    let name = ''
    if (this.state.collapse)
      name = 'Show all'
    else
      name = 'Hide'
    this.setState(state => ({
       collapse: !state.collapse,
       toggleName: name
     }));
    }

    toggleAchievement() {
    let name = ''
    if (this.state.achievementCollapse)
      name = 'Show all'
    else
      name = 'Hide'
    this.setState(state => ({
       achievementCollapse: !state.achievementCollapse,
       achievementToggleName: name
     }));
    }

    toggleTab(tab) {
      if (this.state.activeTab != tab) {
        this.setState({
          activeTab: tab,
          hideButton: false
        });
      }
      else {
        this.setState({
          activeTab: '1',
          hideButton: true
        });
      }
    }

    handleChange(event) {
        this.setState({
          hideButton: true,
        });
    }

    render() {
      const style = this.state.hideButton ? {display: 'none'} : {};
      return (
        <div>
          <ProfileContext.Consumer>
            {(profile) => (
            <Container>
              <Row>
                <Col md="2" xs="12">
                  <Row>
                    <Col>
                      <div className="event-and-courses align">
                        <div className="user-courses">Courses</div>
                          <NavItem className="tab-item">
                            <NavLink
                              className={classnames({ active: this.state.activeTab === '2' })} tab-link
                              onClick={() => { this.toggleTab('2') }}>
                                <div className="user-courses-profile">Following
                                  <div id="number-following-courses" className="courses-numbers">17</div>
                                </div>
                            </NavLink>
                          </NavItem>
                          <NavItem className="tab-item">
                            <NavLink
                              className={classnames({ active: this.state.activeTab === '3' })} tab-link
                              onClick={() => { this.toggleTab('3') }}>
                                <div className="user-courses-profile" href="#">Completed
                                  <div id="number-completed-courses" className="events-numbers">20</div>
                                </div>
                            </NavLink>
                          </NavItem>
                          <NavItem className="tab-item">
                            <NavLink
                              className={classnames({ active: this.state.activeTab === '1' })} tab-link
                              onClick={() => { this.toggleTab('1'); this.handleChange()}}>
                              <div style={style}>
                                {this.backButton}
                              </div>
                            </NavLink>
                          </NavItem>
                      </div>
                      <div className="event-and-courses">
                        <div className="user-courses" style={{paddingTop:"100px"}}>Events</div>
                          <NavItem className="tab-item">
                            <NavLink
                              className={classnames({ active: this.state.activeTab === '4' })} tab-link
                              onClick={() => { this.toggleTab('4') }}>
                                <div className="user-courses-profile">Following
                                  <div id="number-following-courses" className="courses-numbers">17</div>
                                </div>
                            </NavLink>
                          </NavItem>
                          <NavItem className="tab-item">
                            <NavLink
                            className={classnames({ active: this.state.activeTab === '5' })} tab-link
                            onClick={() => { this.toggleTab('5') }}>
                              <div className="user-courses-profile" href="#">Completed
                                <div id="number-completed-courses" className="events-numbers">20</div>
                              </div>
                            </NavLink>
                          </NavItem>
                          <NavItem className="tab-item">
                            <NavLink
                            className={classnames({ active: this.state.activeTab === '6' })} tab-link
                            onClick={() => { this.toggleTab('6') }}>
                              <div className="user-courses-profile" href="#">Created
                                <div id="number-completed-courses" className="courses-numbers">20</div>
                              </div>
                            </NavLink>
                          </NavItem>
                      </div>
                    </Col>
                  </Row>
                </Col>
                <Col xs="1">
                  <div className="vr-line"></div>
                </Col>
                <Col>
                  <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                      <h6 className="main-info">Contact information</h6>
                      <hr className="horz-line"/>
                      <Row>
                        <Col>
                          <h6 className="contact-info">Phone:</h6>
                          <h6 className="contact-info">Address:</h6>
                          <h6 className="contact-info">E-mail:</h6>
                        </Col>
                        <Col>
                          <h6 className="contact-info">{profile.phone_number}</h6>
                          <h6 className="contact-info">{profile.location}</h6>
                          <h6 className="contact-info">{profile.email}</h6>
                        </Col>
                      </Row>
                      <h6 className="main-info">Basic information</h6>
                      <hr className="horz-line"/>
                      <Row>
                        <Col>
                          <h6 className="contact-info">Birthday:</h6>
                          <h6 className="contact-info">I like:</h6>
                        </Col>
                        <Col>
                          <h6 className="contact-info">{profile.birth_date}</h6>
                          <h6 className="contact-info">{profile.i_like}</h6>
                        </Col>
                      </Row>
                    </TabPane>
                    <TabPane tabId="2">
                      <Row>
                        {this.state.courses.slice(0, 3).map((course, i) => {
                          return <Course key={i} description={course.description} id={i} lg={6} />;
                      })}
                      </Row>
                    </TabPane>
                    <TabPane tabId="3">
                      <Row>
                        {this.state.courses.slice(0, 6).map((course, i) => {
                          return <Course key={i} description={course.description} id={i} lg={6} />;
                      })}
                      </Row>
                    </TabPane>
                    <TabPane tabId="4">
                      <Row>
                        {this.state.courses.slice(0, 7).map((course, i) => {
                          return <Course key={i} description={course.description} id={i} lg={6} />;
                      })}
                      </Row>
                    </TabPane>
                    <TabPane tabId="5">
                      <Row>
                        {this.state.courses.slice(0, 5).map((course, i) => {
                          return <Course key={i} description={course.description} id={i} lg={6} />;
                      })}
                      </Row>
                    </TabPane>
                    <TabPane tabId="6">
                      <Row>
                        {this.state.courses.slice(0, 2).map((course, i) => {
                          return <Course key={i} description={course.description} id={i} lg={6} />;
                      })}
                      </Row>
                    </TabPane>
                  </TabContent>
                </Col>
              </Row>
              <Row>
                <Col>
                  <div style={{marginTop:"20px"}}>Favourite courses:</div>
                </Col>
                <Col className="show-hide" style={{marginTop:"20px"}}>
                  <a onClick={this.toggle} style={{cursor:"pointer"}}>{this.state.toggleName}</a>
                </Col>
              </Row>
              <Row>
                {this.state.courses.slice(0, 3).map((course, i) => {
                  return <Course key={i} description={course.description} id={i} lg={4} />;
              })}
              </Row>
              <Collapse isOpen={this.state.collapse}>
                <Row>
                  {this.state.courses.slice(3, this.state.courses.length).map((course, i) => {
                    return <Course key={i} description={course.description} id={i} lg={4} />;
                })}
                </Row>
              </Collapse>
              <Row>
              <Col>
                  <div>Achievemetns:</div>
              </Col>
              <Col className="show-hide">
                <a onClick={this.toggleAchievement} style={{cursor:"pointer"}}>{this.state.achievementToggleName}</a>
              </Col>
              </Row>
              <Row>
                {this.state.achievements.slice(0, 6).map((tooltip, i) => {
                  return <Achievement key={i} item={tooltip} id={i} />;
              })}
              </Row>
              <Collapse isOpen={this.state.achievementCollapse}>
                <Row>
                  {this.state.achievements.slice(6, this.state.achievements.length).map((tooltip, i) => {
                    return <Achievement key={i} item={tooltip} id={i} />;
                })}
                </Row>
              </Collapse>
            </Container>
          )
        }
        </ProfileContext.Consumer>
      </div>
    );
  }
};
