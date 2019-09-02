import React from 'react';

import { Container, Row, Col, Form, Input, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';


import {API} from '../api/axiosConf';
import '../api/pagination';

function renderCourses(course) {

    return (
        <Col xl="4" lg="6" id={`course_${course.id}`} key={course.id}>
        <div className="home-course">
        <h3 className="secondary-header">{course.coursename}</h3>
        </div>
        </Col>
    )
}

export default class Cours extends React.Component{
    constructor(props) {
      super(props);
  }
      render(){

    return (
      <>
        <Container>

                {this.props.coursesList.map( course => renderCourses(course) )}

        </Container>
      </>
      )
  }
}
