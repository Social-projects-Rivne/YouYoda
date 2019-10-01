import React from 'react';

import {Container, Row, Col, Collapse,
  NavItem, NavLink, TabContent, TabPane} from 'reactstrap';
import { css } from '@emotion/core';
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
const BTN_ALL = 'ALL',
      BTN_FAV = 'FAVORITE';


export default class ProfileInfo extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
         activeTab: '1',
         collapse: false,
         achievementCollapse: false,
         toggleName: 'Show all',
         achievementToggleName: 'Show all',
         hideButton: true,
      };
    }

    toggle = () => {
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

    toggleAchievement = () => {
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

    toggleTab = (tab) => {
      if (this.state.activeTab !== tab) {
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

    handleChange = (event) => {
        this.setState({
          hideButton: true,
        });
    }

    render() {
      const style = this.state.hideButton ? {display: 'none'} : {};
      const backButton =  <div onClick={this.handleChange}>
          <img src={require("../img/content/left-arrow.png")}
          alt="left-arrow" className="left-arrow back"/>
          <div className="user-courses-profile back" href="#" style={{marginLeft:"5px"}}>Back to profile</div>
        </div>
      return (
        <div>
          <ProfileContext.Consumer>
            {({userInfo,
              userCompletedCourses,
              userFollowingCourses,
              userFavouritesCourses,
              userCompletedEvents,
              userFollowingEvents,
              userCreatedEvents,
              userAchievements,
              loading,
              updateProfile}) => (
            <div>
            <Container>
              <Row style={{minHeight: "525px"}}>
                <Col md="2" xs="12">
                  <Row>
                    <Col>
                      <div className="event-and-courses align">
                        <div className="user-courses">Courses</div>
                          <NavItem className="tab-item">
                            <NavLink
                              className={classnames({ active: this.state.activeTab === '2' })} tab-link
                              onClick={() => { this.toggleTab('2') }}>
                                <div className="user-courses-profile"><span>Following</span>
                                  <div id="number-following-courses" className="courses-numbers">{userFollowingCourses.length}</div>
                                </div>
                            </NavLink>
                          </NavItem>
                          <NavItem className="tab-item">
                            <NavLink
                              className={classnames({ active: this.state.activeTab === '3' })} tab-link
                              onClick={() => { this.toggleTab('3') }}>
                                <div className="user-courses-profile"><span>Completed</span>
                                  <div id="number-completed-courses" className="events-numbers">{userCompletedCourses.length}</div>
                                </div>
                            </NavLink>
                          </NavItem>
                      </div>
                      <div className="event-and-courses">
                        <div className="user-courses">Events</div>
                          <NavItem className="tab-item">
                            <NavLink
                              className={classnames({ active: this.state.activeTab === '4' })} tab-link
                              onClick={() => { this.toggleTab('4') }}>
                                <div className="user-courses-profile"><span>Following</span>
                                  <div id="number-following-courses" className="courses-numbers">{userFollowingEvents.length}</div>
                                </div>
                            </NavLink>
                          </NavItem>
                          <NavItem className="tab-item">
                            <NavLink
                            className={classnames({ active: this.state.activeTab === '5' })} tab-link
                            onClick={() => { this.toggleTab('5') }}>
                              <div className="user-courses-profile"><span>Completed</span>
                                <div id="number-completed-courses" className="events-numbers">{userCompletedEvents.length}</div>
                              </div>
                            </NavLink>
                          </NavItem>
                          <NavItem className="tab-item">
                            <NavLink
                            className={classnames({ active: this.state.activeTab === '6' })} tab-link
                            onClick={() => { this.toggleTab('6') }}>
                              <div className="user-courses-profile"><span>Created</span>
                                <div id="number-completed-courses" className="courses-numbers">{userCreatedEvents.length}</div>
                              </div>
                            </NavLink>
                          </NavItem>
                      </div>
                    </Col>
                  </Row>
                </Col>
                <Col className="vr-line-wrap">
                  <div className="vr-line"></div>
                </Col>
                <Col>
                    <div className={classnames({ active: this.state.activeTab === '1' })} tab-link
                      onClick={() => { this.toggleTab('1'); this.handleChange()}}>
                      <div style={style}>
                        {backButton}
                      </div>
                    </div>

                  <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                      <h6 className="main-info"><b>Contact information</b></h6>
                      <hr className="horz-line"/>
                      <Row className="contact-info">
                        <Col>Phone:</Col>
                        <Col>{userInfo.phone_number}</Col>
                      </Row>
                      <Row className="contact-info">
                        <Col>Address:</Col>
                        <Col>{userInfo.location}
                          <div className='sweet-loading' style={{marginLeft:"-200px"}}>
                              <ClipLoader
                                css={override}
                                sizeUnit={"px"}
                                size={150}
                                color={'#123abc'}
                                loading={loading}
                              />
                          </div>
                        </Col>
                      </Row>
                      <Row className="contact-info">
                        <Col>E-mail:</Col>
                        <Col>{userInfo.email}</Col>
                      </Row>
                      <Row className="contact-info">&nbsp;</Row>
                      <h6 className="main-info"><b>Basic information</b></h6>
                      <hr className="horz-line"/>
                      <Row className="contact-info">
                        <Col>Birthday:</Col>
                        <Col>{userInfo.birth_date}</Col>
                      </Row>
                      <Row className="contact-info">
                        <Col>I like:</Col>
                        <Col>{userInfo.i_like}</Col>
                      </Row>
                    </TabPane>
                    <TabPane tabId="2">
                      <Row>
                        <Cours manage="True" manageButtons={BTN_ALL} changeProfile={updateProfile} coursesList={userFollowingCourses} loading={loading} lg={4}/>
                        {userFollowingCourses.length || loading ? (
                          null
                        ) : (
                          <NoCoursesOrEvents message={'You have not yet followed to courses'}/>
                        )}
                      </Row>
                    </TabPane>
                    <TabPane tabId="3">
                      <Row>
                        <Cours manage="True" manageButtons={BTN_FAV} changeProfile={updateProfile} coursesList={userCompletedCourses} loading={loading} lg={4}/>
                        {userFollowingCourses.length || loading ? (
                          null
                        ) : (
                          <NoCoursesOrEvents message={'You have not completed any courses yet'}/>
                        )}
                      </Row>
                    </TabPane>
                    <TabPane tabId="4">
                      <Row>
                        <Event manage="True" manageButtons={BTN_ALL} changeProfile={updateProfile} eventList={userFollowingEvents} loading={loading} lg={4}/>
                        {userCompletedEvents.length || loading ? (
                          null
                        ) : (
                          <NoCoursesOrEvents message={'You have not yet followed to events'}/>
                        )}
                      </Row>
                    </TabPane>
                    <TabPane tabId="5">
                      <Row>
                        <Event eventList={userCompletedEvents} loading={loading} lg={4}/>
                        {userCompletedEvents.length || loading ? (
                          null
                        ) : (
                          <NoCoursesOrEvents message={'You have not completed any events yet'}/>
                        )}
                      </Row>
                    </TabPane>
                    <TabPane tabId="6">
                      <Row>
                        <Event eventList={userCreatedEvents} loading={loading} lg={4}/>
                        {userCreatedEvents.length || loading ? (
                          null
                        ) : (
                          <NoCoursesOrEvents message={'You have not created any events yet'}/>
                        )}
                      </Row>
                    </TabPane>
                  </TabContent>
                </Col>
              </Row>
            </Container>
            <div className="favorites-profile-block">
              <Container>
                <Row>
                  <Col className="profile-info-title">Favourite courses:</Col>
                  <Col className="show-hide">
                    <span onClick={this.toggle}>{this.state.toggleName}</span>
                  </Col>
                </Row>
                <Row>
                  <Cours manage="True" manageButtons={BTN_FAV} changeProfile={updateProfile} coursesList={userFavouritesCourses.slice(0, 4)} loading={loading} lg={3}/>
                  {userFavouritesCourses.length || loading ? (
                    null
                  ) : (
                    <NoCoursesOrEvents message={'You have not selected your favourite courses yet'} style={{marginTop:"0px"}}/>
                  )}
                </Row>
                <Collapse isOpen={this.state.collapse}>
                  <Row>
                    {userFavouritesCourses.length ? (
                      <Cours manage="True" manageButtons={BTN_FAV} changeProfile={updateProfile} coursesList={userFavouritesCourses.slice(4, userFavouritesCourses.length)} loading={loading} lg={3}/>
                    ) : (
                      null
                    )}
                  </Row>
                </Collapse>
              </Container>
            </div>
            <Container>
              <Row>
                <Col className="profile-info-title">Achievements:</Col>
                <Col className="show-hide">
                  <span onClick={this.toggleAchievement} style={{cursor:"pointer"}}>{this.state.achievementToggleName}</span>
                </Col>
              </Row>
              <Row className="achievement-row">
                {userAchievements.length ? (
                  userAchievements.slice(0, 6).map((item) => {
                    return <Achievement achievement={item} />;
                  })
                ) : (
                  <NoCoursesOrEvents message={'You have not got any achievements'} style={{marginTop:"0px"}}/>
                )}
                  <ClipLoader
                    css={override}
                    sizeUnit={"px"}
                    size={150}
                    color={'#123abc'}
                    loading={loading}
                  />
              </Row>
              <Collapse isOpen={this.state.achievementCollapse}>
                <Row className="achievement-row">
                  {userFavouritesCourses.length ? (
                    userAchievements.slice(6, userAchievements.length).map((item) => {
                      return <Achievement achievement={item} />;
                    })
                  ):(
                    null
                  )}
                </Row>
              </Collapse>
            </Container>
            </div>
          )
        }
        </ProfileContext.Consumer>
      </div>
    );
  }
};
