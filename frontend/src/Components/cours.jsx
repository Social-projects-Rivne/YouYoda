import React from 'react';

import { css } from '@emotion/core';
import ClipLoader from 'react-spinners/ClipLoader';
import { Container, Row, Col, Form, Input, Button, Card, CardTitle, CardText, CardHeader, CardFooter, CardBody } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { toast } from 'react-toastify';

import { API } from '../api/axiosConf';
import '../api/pagination';


const override = css`
    display: block;
    margin: 0 auto;
    border-color: #FFD466;
`;

function renderCourses(course) {
    if(!course.cover_url)
        course.cover_url = require("../img/static/course.png");
    const courseDate = course.start_date;
    const newCourseDate = moment(courseDate).format('MMMM Do YYYY, h:mm:ss a');
    const courseDuration = course.duration;
    const newCourseDuration = moment.duration(courseDuration).days();
    return (    
        <Col xs="12" sm="6" md="3">
            <Card className="event-card">
                <CardHeader className="event-header">{newCourseDate}</CardHeader>
                <CardBody className="event-body">
                    <CardTitle className="event-card-header">{course.coursename}</CardTitle>
                    <CardText>
                        <p><span className="main-text-span">Category:</span>{'  '}{course.categories}</p>
                        <p>Duration:{'  '}{newCourseDuration}</p>
                        <p><span className="main-text-span">Trainer:</span>{'  '}{course.owner}</p>
                        <p><FontAwesomeIcon icon={['fas', 'map-marker-alt']}/>{' '}{course.location}</p> 
                    </CardText>
                </CardBody>
                <CardFooter>
                    <img width="100%" src={course.cover_url} alt={course.coursename}/>
                </CardFooter>
            </Card>
        </Col>
    )
}

export default class Cours extends React.Component{
    constructor(props) {
      super(props);

      this.state = {
      loading: true
    }
  }
  componentWillMount(){
      this.setState({loading: true})
  }

  componentDidMount(){
      this.setState({loading: false})
  }
      render(){

    return (
      <>
        <Container>
            <div className='sweet-loading'>
                <ClipLoader
                  css={override}
                  sizeUnit={"px"}
                  size={150}
                  color={'#123abc'}
                  loading={this.state.loading}
                />
            </div>   
            <Row>
                {this.props.coursesList.map( course => renderCourses(course) )}
            </Row> 
        </Container>
      </>
      )
  }
}
