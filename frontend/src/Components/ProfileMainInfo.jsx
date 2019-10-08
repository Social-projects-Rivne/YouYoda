import React from 'react';

import {
  Col,
  Collapse,
  Container,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane
} from 'reactstrap';
import classnames from 'classnames';
import ClipLoader from 'react-spinners/ClipLoader';
import { css } from '@emotion/core';

import Achievement from './Achievement'
import Cours from './cours'
import Event from './event'
import NoCoursesOrEvents from './NoCoursesOrEvents';
import PDP from './PDP'
import TrainerCourses from './TrainerCourses'
import { ProfileContext } from './profile-context';


const override = css`
    display: block;
    margin: 0 auto;
    border-color: #FFD466;
`;

const isTrainer = (data) => {
    let show = "";
    if (data){
            show = "user-courses";
           }
    else {
          show = "auth-display-none";
        }
    return show;
}

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
      if (this.state.activeTab !== tab && tab !== '1') {
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

    handleChange = () => {
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
            {(profile) => (
            <div>
            <Container>
              <Row style={{minHeight: "80vh"}}>
                <Col md="2" xs="12">
                  <Row>
                    <Col>
                      <div className="event-and-courses align">
                          <div
                                className={`tab-item ${isTrainer(profile.userInfo.is_trainer)}`}
                                tab-link
                                onClick={() => { this.toggleTab('8') }}
                                style={{cursor:'pointer', marginBottom:'15px'}}
                            >
                                <span >
                                    Own courses
                                </span>
                          </div>
                          <div
                                className="user-courses tab-item"
                                tab-link
                                onClick={() => { this.toggleTab('7') }}
                                style={{cursor:'pointer', marginBottom:'15px'}}
                            >
                                <span >
                                    <span className="pdp-cap-letter">P</span>ersonal <span className="pdp-cap-letter">D</span>evelopment <span className="pdp-cap-letter">P</span>lan
                                </span>
                          </div>
                        <div className="user-courses">Courses</div>
                          <NavItem className="tab-item">
                            <NavLink
                              className={classnames({ active: this.state.activeTab === '2' })} tab-link
                              onClick={() => { this.toggleTab('2') }}>
                                <div className="user-courses-profile"><span>Following</span>
                                  <div id="number-following-courses" className="courses-numbers">{profile.userFollowingCourses.length}</div>
                                </div>
                            </NavLink>
                          </NavItem>
                          <NavItem className="tab-item">
                            <NavLink
                              className={classnames({ active: this.state.activeTab === '3' })} tab-link
                              onClick={() => { this.toggleTab('3') }}>
                                <div className="user-courses-profile"><span>Completed</span>
                                  <div id="number-completed-courses" className="events-numbers">{profile.userCompletedCourses.length}</div>
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
                                  <div id="number-following-courses" className="courses-numbers">{profile.userFollowingEvents.length}</div>
                                </div>
                            </NavLink>
                          </NavItem>
                          <NavItem className="tab-item">
                            <NavLink
                            className={classnames({ active: this.state.activeTab === '5' })} tab-link
                            onClick={() => { this.toggleTab('5') }}>
                              <div className="user-courses-profile"><span>Completed</span>
                                <div id="number-completed-courses" className="events-numbers">{profile.userCompletedEvents.length}</div>
                              </div>
                            </NavLink>
                          </NavItem>
                          <NavItem className="tab-item">
                            <NavLink
                            className={classnames({ active: this.state.activeTab === '6' })} tab-link
                            onClick={() => { this.toggleTab('6') }}>
                              <div className="user-courses-profile"><span>Created</span>
                                <div id="number-completed-courses" className="courses-numbers">{profile.userCreatedEvents.length}</div>
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
                      onClick={() => { this.toggleTab('1') }}>
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
                        <Col>{profile.userInfo.phone_number}</Col>
                      </Row>
                      <Row className="contact-info">
                        <Col>Address:</Col>
                        <Col>{profile.userInfo.location}
                          <div className='sweet-loading' style={{marginLeft:"-200px"}}>
                              <ClipLoader
                                css={override}
                                sizeUnit={"px"}
                                size={150}
                                color={'#123abc'}
                                loading={profile.loading}
                              />
                          </div>
                        </Col>
                      </Row>
                      <Row className="contact-info">
                        <Col>E-mail:</Col>
                        <Col>{profile.userInfo.email}</Col>
                      </Row>
                      <Row className="contact-info">&nbsp;</Row>
                      <h6 className="main-info"><b>Basic information</b></h6>
                      <hr className="horz-line"/>
                      <Row className="contact-info">
                        <Col>Birthday:</Col>
                        <Col>{profile.userInfo.birth_date}</Col>
                      </Row>
                      <Row className="contact-info">
                        <Col>I like:</Col>
                        <Col>{profile.userInfo.i_like}</Col>
                      </Row>
                    </TabPane>
                    <TabPane tabId="2">
                      <Row>
                        <Cours coursesList={profile.userFollowingCourses} loading={profile.loading} lg={4} display={false}/>
                        {profile.userFollowingCourses.length || profile.loading ? (
                          null
                        ) : (
                          <NoCoursesOrEvents message={'You have not yet followed to courses'} style={{margin:"auto", marginTop:"100px"}}/>
                        )}
                      </Row>
                    </TabPane>
                    <TabPane tabId="3">
                      <Row>
                        <Cours coursesList={profile.userCompletedCourses} loading={profile.loading} lg={4} display={false}/>
                        {profile.userCompletedCourses.length || profile.loading ? (
                          null
                        ) : (
                          <NoCoursesOrEvents message={'You have not completed any courses yet'} style={{margin:"auto", marginTop:"100px"}}/>
                        )}
                      </Row>
                    </TabPane>
                    <TabPane tabId="4">
                      <Row>
                        <Event eventList={profile.userFollowingEvents} loading={profile.loading} lg={4} display={false}/>
                        {profile.userFollowingEvents.length || profile.loading ? (
                          null
                        ) : (
                          <NoCoursesOrEvents message={'You have not yet followed to events'} style={{margin:"auto", marginTop:"100px"}}/>
                        )}
                      </Row>
                    </TabPane>
                    <TabPane tabId="5">
                      <Row>
                        <Event eventList={profile.userCompletedEvents} loading={profile.loading} lg={4} display={false}/>
                        {profile.userCompletedEvents.length || profile.loading ? (
                          null
                        ) : (
                          <NoCoursesOrEvents message={'You have not completed any events yet'} style={{margin:"auto", marginTop:"100px"}}/>
                        )}
                      </Row>
                    </TabPane>
                    <TabPane tabId="6">
                      <Row>
                        <Event eventList={profile.userCreatedEvents} loading={profile.loading} lg={4} display={false}/>
                        {profile.userCreatedEvents.length || profile.loading ? (
                          null
                        ) : (
                          <NoCoursesOrEvents message={'You have not created any events yet'} style={{margin:"auto", marginTop:"100px"}}/>
                        )}
                      </Row>
                    </TabPane>
                    <TabPane tabId="7">
                      <Row>
                        <PDP/>
                      </Row>
                    </TabPane>
                     <TabPane tabId="8">
                      <Row>
                        <TrainerCourses/>
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
                  <Cours coursesList={profile.userFavouritesCourses.slice(0, 4)} loading={profile.loading} lg={3} display={false}/>
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
                {profile.userAchievements.slice(0, 6).map((item) => {
                  return <Achievement achievement={item} />;
                })}
                {profile.userAchievements.length || profile.loading ? (
                  null
                ) : (
                  <NoCoursesOrEvents message={'You have not got any achievements'} style={{marginTop:"0px"}}/>
                )}
                  <ClipLoader
                    css={override}
                    sizeUnit={"px"}
                    size={150}
                    color={'#123abc'}
                    loading={profile.loading}
                  />
              </Row>
              <Collapse isOpen={this.state.achievementCollapse}>
                <Row className="achievement-row">
                  {profile.userFavouritesCourses.length ? (
                    profile.userAchievements.slice(6, profile.userAchievements.length).map((item) => {
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
