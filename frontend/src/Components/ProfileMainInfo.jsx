import React from 'react';

import {Container, Row, Col, CardTitle, CardText, CardImg, Card, Collapse,
  Nav, NavItem, NavLink, TabContent, TabPane} from 'reactstrap';
import { css } from '@emotion/core';
import { Resizable, ResizableBox } from 'react-resizable';
import ClipLoader from 'react-spinners/ClipLoader';
import classnames from 'classnames';
import {ProfileContext} from './profile-context';
import NoCoursesOrEvents from './NoCoursesOrEvents';
import Cours from './cours'
import Event from './event'
import Achievement from './Achievement'

const override = css`
    display: block;
    margin: 0 auto;
    border-color: #FFD466;
`;


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
                                  <div id="number-following-courses" className="courses-numbers">{profile.userFollowingCourses.length}</div>
                                </div>
                            </NavLink>
                          </NavItem>
                          <NavItem className="tab-item">
                            <NavLink
                              className={classnames({ active: this.state.activeTab === '3' })} tab-link
                              onClick={() => { this.toggleTab('3') }}>
                                <div className="user-courses-profile" href="#">Completed
                                  <div id="number-completed-courses" className="events-numbers">{profile.userCompletedCourses.length}</div>
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
                                  <div id="number-following-courses" className="courses-numbers">{profile.userFollowingEvents.length}</div>
                                </div>
                            </NavLink>
                          </NavItem>
                          <NavItem className="tab-item">
                            <NavLink
                            className={classnames({ active: this.state.activeTab === '5' })} tab-link
                            onClick={() => { this.toggleTab('5') }}>
                              <div className="user-courses-profile" href="#">Completed
                                <div id="number-completed-courses" className="events-numbers">{profile.userCompletedEvents.length}</div>
                              </div>
                            </NavLink>
                          </NavItem>
                          <NavItem className="tab-item">
                            <NavLink
                            className={classnames({ active: this.state.activeTab === '6' })} tab-link
                            onClick={() => { this.toggleTab('6') }}>
                              <div className="user-courses-profile" href="#">Created
                                <div id="number-completed-courses" className="courses-numbers">{profile.userCreatedEvents.length}</div>
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
                          <h6 className="contact-info">{profile.userInfo.phone_number}</h6>
                          <div className='sweet-loading' style={{marginLeft:"-200px"}}>
                              <ClipLoader
                                css={override}
                                sizeUnit={"px"}
                                size={150}
                                color={'#123abc'}
                                loading={profile.loading}
                              />
                          </div>
                          <h6 className="contact-info">{profile.userInfo.location}</h6>
                          <h6 className="contact-info">{profile.userInfo.email}</h6>
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
                          <h6 className="contact-info">{profile.userInfo.birth_date}</h6>
                          <h6 className="contact-info">{profile.userInfo.i_like}</h6>
                        </Col>
                      </Row>
                    </TabPane>
                    <TabPane tabId="2">
                      <Row>
                        <Cours coursesList={profile.userFollowingCourses} loading={profile.loading} lg={4}/>
                        {profile.userFollowingCourses.length || profile.loading ? (
                          null
                        ) : (
                          <NoCoursesOrEvents message={'You have not yet followed to courses'}/>
                        )}
                      </Row>
                    </TabPane>
                    <TabPane tabId="3">
                      <Row>
                        <Cours coursesList={profile.userCompletedCourses} loading={profile.loading} lg={4}/>
                        {profile.userFollowingCourses.length || profile.loading ? (
                          null
                        ) : (
                          <NoCoursesOrEvents message={'You have not completed any courses yet'}/>
                        )}
                      </Row>
                    </TabPane>
                    <TabPane tabId="4">
                      <Row>
                        <Event eventList={profile.userFollowingEvents} loading={profile.loading} lg={4}/>
                        {profile.userCompletedEvents.length || profile.loading ? (
                          null
                        ) : (
                          <NoCoursesOrEvents message={'You have not yet followed to events'}/>
                        )}
                      </Row>
                    </TabPane>
                    <TabPane tabId="5">
                      <Row>
                        <Event eventList={profile.userCompletedEvents} loading={profile.loading} lg={4}/>
                        {profile.userCompletedEvents.length || profile.loading ? (
                          null
                        ) : (
                          <NoCoursesOrEvents message={'You have not completed any events yet'}/>
                        )}
                      </Row>
                    </TabPane>
                    <TabPane tabId="6">
                      <Row>
                        <Event eventList={profile.userCreatedEvents} loading={profile.loading} lg={4}/>
                        {profile.userCreatedEvents.length || profile.loading ? (
                          null
                        ) : (
                          <NoCoursesOrEvents message={'You have not created any events yet'}/>
                        )}
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
                <Cours coursesList={profile.userFavouritesCourses.slice(0, 4)} loading={profile.loading} lg={3}/>
                {profile.userFavouritesCourses.length || profile.loading ? (
                  null
                ) : (
                  <NoCoursesOrEvents message={'You have not selected your favourite courses yet'} style={{marginTop:"0px"}}/>
                )}
              </Row>
              <Collapse isOpen={this.state.collapse}>
                <Row>
                  {profile.userFavouritesCourses.length ? (
                    <Cours coursesList={profile.userFavouritesCourses.slice(4, profile.userFavouritesCourses.length)} loading={profile.loading} lg={3}/>
                  ) : (
                    <div></div>
                  )}
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
                {!profile.loading ? (
                  profile.userAchievements.slice(0, 6).map((item, i) => {
                    return <Achievement achievement={item} id={i} />;
                  })
                ) : (
                  <ClipLoader
                    css={override}
                    sizeUnit={"px"}
                    size={150}
                    color={'#123abc'}
                    loading={profile.loading}
                  />
                )}
              </Row>
              <Collapse isOpen={this.state.achievementCollapse}>
                <Row>
                  {profile.userAchievements.slice(6, profile.userAchievements.length).map((item, i) => {
                    return <Achievement achievement={item} id={i} />;
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
