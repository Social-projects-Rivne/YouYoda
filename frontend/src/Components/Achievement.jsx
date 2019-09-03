import React from 'react';

import {Container, Row, Col, CardTitle, CardText, CardImg, Card, UncontrolledTooltip} from 'reactstrap';


export default class Achievement extends React.Component {
    render() {
      return (
        <Col xs="4" md="2">
          <div className="course" id={"Tooltip-" + this.props.id}>
            <a href="#">
              <Card className="card" body>
                <CardImg top width="100%" src={require('../img/content/achievement.png')}
                      className="achievement-image" alt="course-image"/>
              </Card>
            </a>
            <UncontrolledTooltip placement="right" target={'Tooltip-' + this.props.id}>
              Achievement name
            </UncontrolledTooltip>
          </div>
        </Col>
    );
  }
};
