import React from 'react';

import { Container, Row, Col, Card, CardTitle, CardText, CardHeader, CardFooter, CardBody } from 'reactstrap';
import ClipLoader from 'react-spinners/ClipLoader';
import { css } from '@emotion/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import { Redirect, Link } from 'react-router-dom'

import { defaultPhoto } from '../utils';


const override = css`
    display: block;
    margin: 0 auto;
    border-color: #FFD466;
`;

export default class Cours extends React.Component{
    constructor(props) {
      super(props);

      this.state = {
          redirect: false,
      }
    }

    componentWillMount(){
      this.setState({loading: true})
  }

    componentDidMount(){
        this.setState({loading: false})
    }

    handleClick = async (course) => {
        await this.setState({ course });
        await this.setState({ redirect: true });
        window.location.reload();
    }

    renderCourses(course) {
        let defImg = "/media/beautiful-crowd-cute-2869374.jpg";
        let coverImg = defaultPhoto(defImg, course.cover_url);
        const courseDate = course.start_date;
        const newCourseDate = moment.unix(courseDate).format('MMMM Do YYYY, h:mm a');
        const courseDuration = course.duration;
        const newCourseDuration = moment.duration(courseDuration).hours();
        return (
            <Col sm="12" md="6" lg="4" xl={this.props.lg}>
                <Link className="card-link" onClick={() => this.handleClick(course)} >
                    <Card className="event-card">
                        <CardHeader className="event-header">{newCourseDate}</CardHeader>
                        <CardBody className="event-body">
                            <CardTitle className="event-card-header">
                                <Link>{course.coursename}</Link>
                            </CardTitle>
                            <CardText>
                                <p><span className="main-text-span">Category: </span>{course.categories}</p>
                                <p>Duration: {newCourseDuration} hours</p>
                                <p><span className="main-text-span">Trainer: </span>{`${course.owner.first_name} ${course.owner.last_name}`}</p>
                                <p><FontAwesomeIcon icon={['fas', 'map-marker-alt']}/>{' '}{course.location}</p>
                            </CardText>
                        </CardBody>
                        <CardFooter className="card-event-footer">
                            <img width="100%" src={coverImg} alt={course.coursename}/>
                        </CardFooter>
                    </Card>
                </Link>
            </Col>
        )
    }

    render(){
        const { redirect } = this.state;
        if (redirect) {
           return <Redirect to={{pathname: '/course/detail', state: {course: this.state.course}}}/>;
        }
        return (
            <Container>
                <div className='sweet-loading'>
                    <ClipLoader
                      css={override}
                      sizeUnit={"px"}
                      size={150}
                      color={'#123abc'}
                      loading={this.props.loading}
                    />
                </div>
                <Row>
                    {this.props.coursesList.map( course => this.renderCourses(course) )}
                </Row>
            </Container>
        )
    }
}
