import React from 'react';

import { css } from '@emotion/core';
import ClipLoader from 'react-spinners/ClipLoader';
import { Container, Row, Col, Form, Input, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import {API} from '../api/axiosConf';
import '../api/pagination';


const override = css`
    display: block;
    margin: 0 auto;
    border-color: #FFD466;
`;

function renderCourses(course) {

    return (
        <Col xl="4" lg="6" id={`course_${course.id}`} key={course.id}>
        <div className="home-course">
        <h3 className="secondary-header">{course.coursename}</h3>
        </div>
        </Col>
    )
}

export default class Event extends React.Component{
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

                {this.props.eventList.map( course => renderCourses(course) )}

        </Container>
      </>
      )
  }
}
