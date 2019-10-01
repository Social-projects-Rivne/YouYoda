import React from 'react';

import { Container, Row, Col, Card, CardTitle, CardText, CardHeader, CardFooter, CardBody } from 'reactstrap';
import ClipLoader from 'react-spinners/ClipLoader';
import { css } from '@emotion/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import { Redirect, Link } from 'react-router-dom';

import { defaultPhoto } from '../utils';
import ManageButtons from './CoursManageButtons';


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
        const newCourseDate = moment(courseDate).format('MMMM Do YYYY, h:mm:ss a');
        const courseDuration = course.duration;
        const newCourseDuration = moment.duration(courseDuration).days();
        let classManage = (this.props.manage)? 'class-manage-course' : '';
        return (
            <Col sm="12" md="6" lg="4" xl={this.props.lg} className="wrap-manage-course">
                <div className={`event-card-wrap ${classManage}`}>
                <Link className="card-link" onClick={() => this.handleClick(course)} >
                    <Card className="event-card">
                        <CardHeader className="event-header">{newCourseDate}</CardHeader>
                        <CardBody className="event-body">
                            <CardTitle className="event-card-header">
                                <Link>{course.coursename}</Link>
                            </CardTitle>
                            <CardText>
                                <p><span className="main-text-span">Category: </span>{course.categories}</p>
                                <p>Duration: {newCourseDuration} days</p>
                                <p><span className="main-text-span">Trainer: </span>{course.owner}</p>
                                <p><FontAwesomeIcon icon={['fas', 'map-marker-alt']}/>{' '}{course.location}</p>
                            </CardText>
                        </CardBody>
                        <CardFooter className="card-event-footer">
                            <img width="100%" src={coverImg} alt={course.coursename}/>
                        </CardFooter>
                    </Card>
                </Link>
                {(this.props.manage && this.props.changeProfile)? <ManageButtons manageButtons={this.props.manageButtons} changeProfile={this.props.changeProfile} course={course} /> : null}
                </div>
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
