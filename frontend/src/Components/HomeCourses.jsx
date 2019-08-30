import React from 'react';

import {Container,Row,Button,Col} from 'reactstrap';
import { Redirect } from 'react-router-dom';

import { axiosGet } from '../api/axiosGet';


export default class HomeCourses extends React.Component{
     constructor(props) {
        super(props);

        this.state = {
            redirect: false,
            coursesList: [ {
   "coursename": "Course3",
   "description": "Perfect for people who never swam",
   "rate": 9,
   "cover_url": "",
   "owner": 4,
   "status": "Closed",
   "is_public": true,
   "start_date": "2019-08-28T10:26:37.432800+03:00",
   "duration": "3 10:00:00",
   "cost": 0,
   "members_limit": 10,
   "categories": 4,
   "location": "Lviv, Ukraine"
 },
 {
   "coursename": "Lesson of swimming",
   "description": "Perfect for people who never swam",
   "rate": 8,
   "cover_url": "",
   "owner": 5,
   "status": "Open",
   "is_public": true,
   "start_date": "2019-08-28T10:26:37.429073+03:00",
   "duration": "20 10:00:00",
   "cost": 0,
   "members_limit": 20,
   "categories": 2,
   "location": "Rivne, Ukraine"
 },
 {
   "coursename": "Front-end",
   "description": "React Redux bla bla the best",
   "rate": 7,
   "cover_url": "",
   "owner": 5,
   "status": "In Progres",
   "is_public": true,
   "start_date": "2019-08-28T10:26:37.432041+03:00",
   "duration": "10 10:00:00",
   "cost": 0,
   "members_limit": 40,
   "categories": 3,
   "location": "Kiev, Ukraine"
 },
 {
   "coursename": "Course6",
   "description": "Perfect for people who never swam",
   "rate": 7,
   "cover_url": "",
   "owner": 7,
   "status": "Open",
   "is_public": false,
   "start_date": "2019-08-28T10:26:37.434667+03:00",
   "duration": "500 10:00:00",
   "cost": 0,
   "members_limit": 12,
   "categories": 1,
   "location": "Rivne, Ukraine"
 },
 {
   "coursename": "Course7",
   "description": "Perfect for people who never swam",
   "rate": 7,
   "cover_url": "",
   "owner": 4,
   "status": "Open",
   "is_public": false,
   "start_date": "2019-08-28T10:26:37.435245+03:00",
   "duration": "500 10:00:00",
   "cost": 0,
   "members_limit": 12,
   "categories": 3,
   "location": "Rivne, Ukraine"
 },
 {
   "coursename": "Course5",
   "description": "Perfect for people who never swam",
   "rate": 6,
   "cover_url": "",
   "owner": 6,
   "status": "Scheduled",
   "is_public": false,
   "start_date": "2019-08-28T10:26:37.434069+03:00",
   "duration": "200 10:00:00",
   "cost": 0,
   "members_limit": 50,
   "categories": 3,
   "location": "Lviv, Ukraine"
 }],
        };

    this.handleClick = this.handleClick.bind(this);

    }

    /*componentWillMount() {
        let path = 'courses/top'
        let coursesList = axiosGet(path);
        coursesList.then( valueCourses=> {
            this.setState({
                coursesList: valueCourses,
            });  
        });
    }*/

    handleClick(course) {
       this.setState({ redirect: true });
       this.setState({course});
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
