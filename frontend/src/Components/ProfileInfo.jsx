import React from 'react';

import {Container, Row, Col} from 'reactstrap';

import { DEFAULT_AVATAR_URL, defaultPhoto } from '../utils';
import {ProfileContext} from './profile-context';


export default class ProfileInfo extends React.Component {
    render() {
      return (
        <div className="title-profile-block">
          <ProfileContext.Consumer>
            {({userInfo, updateProfile}) => (
            <Container>
              <Row>
                  <Col md="3" className="profile-photo-container">
                    <div>
                        <img src={defaultPhoto(DEFAULT_AVATAR_URL, localStorage.getItem('avatar_url'))}
                          className="profile-photo" alt="profile-photoimg"/>
                        <div className="edit-label">
                            <a href="/editprofile">Edit profile</a>
                        </div>
                    </div>
                  </Col>
                  <Col className="profile-info">
                      <div className="user-name">
                          <div>
                            <h2>{userInfo.first_name}</h2>
                            <h2 style={{paddingLeft:"5px"}}>{userInfo.last_name}</h2>
                          </div>
                          <div>
                            <a href="/editprofile" title="Edit profile">
                              <img src={require('../img/static/edit_tool.svg')}
                                className="edit-tool" alt="edit-tool"/>
                            </a>
                          </div>
                      </div>
                      <div className="user-info">
                        <h6>{userInfo.about_me}</h6>
                      </div>
                  </Col>
              </Row>
            </Container>
          )}
        </ProfileContext.Consumer>
      </div>
    );
  }
};
