import React from 'react';

import {Container, Row, Col} from 'reactstrap';
import {getProfileInfo} from "../api/getProfileInfo";
import axios from 'axios'

export default class ProfileInfo extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        userInfo:{},
      };
    }
    getInfo = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/user/profile/view');
        return response.data;
      }
      catch (error) {
        console.error(error);
      }
    };
    updateField = (event) => {
        let fieldName = event.target.name;
        let newState = {};
        newState[fieldName] = event.target.value;
        this.setState(newState)
    };
    async componentDidMount() {
        let userData = await this.getInfo();
        if (typeof userData !== 'undefined') {
          let userInfo = {}
          Object.keys(userData).map(function (key) {
              userInfo[key] = userData[key]
          })
        this.setState(userInfo)
      }
    }

    render() {
      return (
        <div>
        <Container>
        <Row>
            <Col md="3" className="profile-photo-container">
              <div>
                  <img src={require('../img/content/profile_photo.png')}
                    className="profile-photo" href="#" alt="profile-photo" href={this.state.avatar_url}/>
                  <div className="edit-label">
                      <a href="#">Edit</a>
                  </div>
              </div>
            </Col>
            <Col className="profile-info">
                <div className="user-name">
                    <div>
                      <h2>{this.state.first_name}</h2>
                      <h2 style={{paddingLeft:"5px"}}>{this.state.last_name}</h2>
                    </div>
                    <div>
                      <a href="#">
                        <img src={require('../img/static/edit_tool.svg')}
                          className="edit-tool" alt="edit-tool"/>
                      </a>
                    </div>
                </div>
                <div className="user-info">
                  <h6>{this.state.about_me}</h6>
                </div>
            </Col>
        </Row>
        <Row>
          <Col>
            <hr className="hr-line"/>
          </Col>
        </Row>
        </Container>
        </div>
    );
  }
};
