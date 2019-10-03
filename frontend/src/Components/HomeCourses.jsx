import React from 'react';

import { Container, Row, Col } from 'reactstrap';
import { Redirect, Link } from 'react-router-dom';
import StarRatingComponent from 'react-star-rating-component';


import { axiosGet } from '../api/axiosGet';
import { defaultPhoto } from '../utils'


export default class HomeCourses extends React.Component{
     constructor(props) {
        super(props);

        this.state = {
            redirect: false,
            coursesList: [],
        };
    }

    async componentDidMount() {
        let path = 'courses/top'
        let listCourses = await axiosGet(path);
        this.setState({
                coursesList: listCourses,
            });
    }

    handleClick = (course) => {
       this.setState({ redirect: true });
       this.setState({ course });
    };

    renderCourses(course) {
        let defImg = "/media/car-racing-4394450_1920.jpg";
        let coverImg = defaultPhoto(defImg, course.cover_url);

        return (
            <Col
                xl="4" lg="6"
                id={`course_${course.id}`}
                key={course.id}
                onClick={() => this.handleClick(course)}
                style={{cursor:'pointer'}}
            >
                  <div className="home-course">
                    <div className="course-cover-photo">
                        <img src={coverImg} alt={course.coursename} />
                    </div>
                        <h3 className="secondary-header">
                            {course.coursename}
                        </h3>
                        <div className="d-flex justify-content-end home-rate">
                            <div className="main-text star d-flex flex-wrap ">
                                <StarRatingComponent
                                    starCount={10}
                                    className="home-course-star-rating"
                                    value={course.rate}
                                />
                            <div className="rate-num">
                                <span className="rate-big" style={{color:"green"}}>{course.rate}/</span>
                                <span className="rate-small">10</span>
                            </div>
                            </div>
                        </div>
                    <p className="main-text courses-description">{course.description}</p>
                  </div>
            </Col>
        )
    }

    render(){
        const { redirect } = this.state;
        if (redirect) {
           return <Redirect to={{pathname: '/course/detail', state: {course: this.state.course}}}/>;
        }


        return(
            <div style={{backgroundColor:'#E8E8E8'}} id="home-course">
            <Container className="home-event">
            <Row>
                <Col className="header-block">
                    <h1>Top Courses </h1>
                    <p className="main-text">People are busy.
                    So, this UI Kit let’s you customize,
                    build and deploy your landing page,<br/>
                    so you can start selling your product
                    to potential customers.</p>
                </Col>
            </Row>
            <Row>
                {this.state.coursesList.map( course => this.renderCourses(course) )}
            </Row>
            <Row className="d-flex justify-content-end">
                <Link to="/courses/search">
                    <div className="more-courses-events">
                        <button className="learn-more">
                            <div className="circle">
                            <span className="icon arrow"></span>
                            </div>
                            <p className="button-text">More Courses</p>
                        </button>
                    </div>
                </Link>
                </Row>
            </Container>
            </div>
        )
    }
};
