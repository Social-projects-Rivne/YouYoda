import React from 'react';

import {Container, Row, Col} from 'reactstrap';
import {Redirect} from 'react-router-dom'
import { defaultPhoto } from '../utils';

import {ProfileContext} from './profile-context';


export default class ProfileInfo extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        redirect: false,
      };
    }

    setRedirect = () => {
      this.setState({
        redirect: true
      })
    }

    renderRedirect = () => {
      if (this.state.redirect) {
        return <Redirect to='/editprofile' />
      }
    }

    render() {
      return (
        <div>
          <ProfileContext.Consumer>
            {profile => (
            <Container>
              <Row>
                  <Col onClick={this.setRedirect} md="3" className="profile-photo-container">
                    <div>
                        <img src={defaultPhoto("/media/avatar.png", profile.userInfo.avatar_url)}
                          className="profile-photo" href="#" alt="profile-photo"/>
                        <div className="edit-label">
                            {this.renderRedirect()}
                            <a onClick={this.setRedirect} href="#">Edit</a>
                        </div>
                    </div>
                  </Col>
                  <Col className="profile-info">
                      <div className="user-name">
                          <div>
                            <h2>{profile.userInfo.first_name}</h2>
                            <h2 style={{paddingLeft:"5px"}}>{profile.userInfo.last_name}</h2>
                          </div>
                          <div>
                            {this.renderRedirect()}
                            <a onClick={this.setRedirect} href="#">
                              <img src={require('../img/static/edit_tool.svg')}
                                className="edit-tool" alt="edit-tool"/>
                            </a>
                          </div>
                      </div>
                      <div className="user-info">
                        <h6>{profile.userInfo.about_me}</h6>
                      </div>
                  </Col>
              </Row>
              <Row>
                <Col>
                  <hr className="hr-line"/>
                </Col>
              </Row>
            </Container>
          )}
        </ProfileContext.Consumer>
      </div>
    );
  }
};
