import React from 'react';

import {Container,Row,Button,Col} from 'reactstrap';

import { axiosGet } from '../api/axiosGet';


export default class HomeCourses extends React.Component{
     constructor(props) {
        super(props);

        this.state = {
            coursesList: [{
   "coursename": "Course3",
   "description": "Perfect for people who never swam",
   "rate": 9,
   "cover_url": ""
 },
 {
   "coursename": "Lesson of swimming",
   "description": "Perfect for people who never swam",
   "rate": 8,
   "cover_url": ""
 },
 {
   "coursename": "Front-end",
   "description": "React Redux bla bla the best",
   "rate": 7,
   "cover_url": ""
 },
 {
   "coursename": "Course6",
   "description": "Perfect for people who never swam",
   "rate": 7,
   "cover_url": ""
 },
 {
   "coursename": "Course7",
   "description": "Perfect for people who never swam",
   "rate": 7,
   "cover_url": ""
 },
 {
   "coursename": "Course5",
   "description": "Perfect for people who never swam",
   "rate": 6,
   "cover_url": ""
 }],
        };
    }

    // componentWillMount() {
    //     let path = 'courses/top'
    //     let coursesList = axiosGet(path);
    //     coursesList.then( valueCourses=> {
    //         this.setState({
    //             coursesList: valueCourses,
    //         });  
    //     });
    // }

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
                    <Button color="warning" className="btn-yellow" disabled>Details</Button>
                  </div>
            </Col>
        )
    }

    render(){

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
