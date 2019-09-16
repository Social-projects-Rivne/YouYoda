import React from 'react';

import {Container, Row, Col} from 'reactstrap';


export default class NoCoursesOrEvents extends React.Component {

    render() {
      return (
          <Container>
            <div className="back-no-info" style={this.props.style}>
              <Row className="justify-content-center">
                  <img src={require('../img/static/yodahome.png')}
                          className="logo" alt="YouYoda"/>
              </Row>
              <Row className="justify-content-center">
                  <div>{this.props.message}</div>
              </Row>
            </div>
          </Container>
    );
  }
};
