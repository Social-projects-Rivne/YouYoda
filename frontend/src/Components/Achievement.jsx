import React from 'react';

import {Col, Card, UncontrolledTooltip} from 'reactstrap';

const URL = 'http://localhost:8000'


export default class Achievement extends React.Component {
    render() {
      return (
        <Col xs="4" md="2">
          <div className="course achievement-image" id={"Tooltip-" + this.props.achievement.course_id}>
            <Card className="card" body>
              <img width="100%" src={URL + this.props.achievement.image_url}
                    className="achievement-image" alt={require('../img/content/achievement.png')}/>
            </Card>
            <UncontrolledTooltip placement="right" target={"Tooltip-" + this.props.achievement.course_id}>
              {this.props.achievement.name}
            </UncontrolledTooltip>
          </div>
        </Col>
    );
  }
};
