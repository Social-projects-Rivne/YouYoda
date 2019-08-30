import React from 'react';

import { Container,Row,Button,Col } from 'reactstrap';
import { Redirect } from 'react-router-dom';

import { axiosGet } from '../api/axiosGet';


export default class HomeCourses extends React.Component{
     constructor(props) {
        super(props);

        this.state = {
            redirect: false,
            coursesList: [],
        };

    this.handleClick = this.handleClick.bind(this);

    }

    componentWillMount() {
        let path = 'courses/top'
        let coursesList = axiosGet(path);
        coursesList.then( valueCourses=> {
            this.setState({
                coursesList: valueCourses,
            });  
        });
    }

    handleClick(course) {
       this.setState({ redirect: true });
       this.setState({ course });
    };

    renderCourses(course) {
        if(!course.cover_url)
            course.cover_url = require("../img/static/course.png");
        return (
            <Col xl="4" lg="6" id={`course_${course.id}`} key={course.id}>
                  <div className="home-course">
                    <img src={course.cover_url} alt={course.coursename} />
                    <h3 className="secondary-header">{course.coursename}</h3>
                    <p className="main-text">{course.description}</p>
                    <p className="main-text">Rate:  {course.rate}</p>
                    <Button color="warning" className="btn-yellow" onClick={(event) => this.handleClick(course)}>Details</Button>
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
            </Container>
            </div>
        )
    }
};
