import React from 'react';

import {Container, Row, Col, CardTitle, CardText, CardImg, Card} from 'reactstrap';


export default class Course extends React.Component {
    render() {
      return (
          <Col md="6" xs="12" sm="12" lg={this.props.lg} className="course">
            <a href="#">
              <Card className="card" body>
                <CardImg top width="100%" src={require('../img/static/course-image.png')}
                      className="course-image" alt="course-image"/>
                <div className="description-background"></div>
                <Row>
                  <Col>
                    <CardText className="course-description">{this.props.description}
                    </CardText>
                  </Col>
                </Row>
              </Card>
            </a>
          </Col>
    );
  }
};
