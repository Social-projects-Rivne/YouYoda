import React from 'react';

import {Container, Row, Col} from 'reactstrap';
import {ProfileContext} from './profile-context';


export default class ProfileInfo extends React.Component {
    render() {
      return (
        <div>
          <ProfileContext.Consumer>
            {(profile) => (
            <Container>
              <Row>
                <Col>
                  <h6 className="main-info">Contact information</h6>
                  <hr className="horz-line"/>
                </Col>
              </Row>
              <Row>
                <Col>
                  <h6 className="contact-info">Phone:</h6>
                  <h6 className="contact-info">Address:</h6>
                  <h6 className="contact-info">E-mail:</h6>
                  <h6 className="contact-info">Site:</h6>
                </Col>
                <Col>
                  <h6 className="contact-info">{profile.phone_number}</h6>
                  <h6 className="contact-info">{profile.location}</h6>
                  <h6 className="contact-info">{profile.email}</h6>
                  <h6 className="contact-info">{profile.email}</h6>
                </Col>
              </Row>
              <Row>
                <Col>
                  <h6 className="main-info">Basic information</h6>
                  <hr className="horz-line"/>
                </Col>
              </Row>
              <Row>
                <Col>
                  <h6 className="contact-info">Birthday:</h6>
                  <h6 className="contact-info">Active:</h6>
                  <h6 className="contact-info">I like:</h6>
                  <h6 className="contact-info">Role:</h6>
                </Col>
                <Col>
                  <h6 className="contact-info">{profile.birth_date}</h6>
                  <h6 className="contact-info">{profile.is_active}</h6>
                  <h6 className="contact-info">{profile.about_me}</h6>
                  <h6 className="contact-info">{profile.is_trainer}</h6>
                </Col>
              </Row>
            </Container>
          )
        }
        </ProfileContext.Consumer>
      </div>
    );
  }
};
