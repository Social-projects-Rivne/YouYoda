import React from 'react';
import StarRatingComponent from 'react-star-rating-component';

import { Container,Row,Button,Col } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import { isAuthenticated } from '../utils';

import moment from 'moment';


export default class CourseDetail extends React.Component{
    constructor(props){
      super(props);
      this.state = {
            redirect: false,
       };
    };

    handleClickReturn = () => {
       this.setState({ redirect: true });
    };

    render(){
        if(!this.props.course.cover_url)
            this.props.course.cover_url = require("../img/static/course.png");
        const courseDate = this.props.course.start_date;
        const newCourseDate = moment(courseDate).format('MMMM Do YYYY, h:mm:ss a');
        const courseDuration = this.props.course.duration;
        const newCourseDuration = moment.duration(courseDuration).days();
        const { redirect } = this.state;
        if (redirect) {
           return <Redirect to='/'/>;
        }

        return(
            <div >
            <Container className="home-event">
            <Row>
                <Col className="d-flex justify-content-between">
                    <h1 className="secondary-header">{this.props.course.coursename}</h1>
                    <div className="main-text star d-flex flex-wrap "> 
                        <StarRatingComponent starCount={10} className="course-star-rating"
                                             value={this.props.course.rate} />
                        <div className="rate-num">
                            <span className="rate-big">{this.props.course.rate}/</span>
                            <span className="rate-small">10</span>   
                        </div>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    <img style={{maxWidth: "100%", height: "auto", width: '100%'}} src={this.props.course.cover_url} alt={this.props.course.coursename} />
                    <h4 className="course-detail-h4">About:</h4> 
                    <p className="main-text">{this.props.course.description}</p>
                </Col>
            </Row>
            <Row>
                <Col md="6" xs="12" className="course-detail-first-col">
                </Col>
                <Col md="6" xs="12" className="course-detail-second-col">
                    <p className="main-text"><span className="main-text-span">Category:</span>{'  '}{this.props.course.categories}</p>
                    <p className="main-text">Trainer:{'  '}{this.props.course.owner}</p>
                    <p className="main-text"><span className="main-text-span">Start:</span>{'  '}{newCourseDate}</p>
                    <p className="main-text">Duration:{'  '}{newCourseDuration} days </p>
                    <p className="main-text"><span className="main-text-span">Cost:</span>{'  '}{this.props.course.cost} $</p>
                    <p className="main-text">Location:{'  '}{this.props.course.location}</p>
                    <p className="main-text"><span className="main-text-span">Limit of members:</span>{'  '}{this.props.course.members_limit}</p>
                    <p className="main-text">Status:{'  '}{this.props.course.status}</p>
                </Col>
            </Row>
                <Col xs="12" className="btn-group-course-detail">
                    <Button className={`btn-sign ${isAuthenticated("show")}`} color="warning" 
                                        style={{marginRight:'33px'}}>Join</Button>
                    <Button color="secondary" className="btn-sign" onClick={this.handleClickReturn}>Cancel</Button>
                </Col>
            <Row>
            </Row>
            </Container>
            </div>
        )
    }
};