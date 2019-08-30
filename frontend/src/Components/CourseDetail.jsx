import React from 'react';

import {Container,Row,Button,Col} from 'reactstrap';
import { Redirect } from 'react-router-dom';
import { isAuthenticated } from '../utils';

import moment from 'moment';


export default class CourseDetail extends React.Component{
    constructor(props){
      super(props);
  }


    render(){
        if(!this.props.course.cover_url)
            this.props.course.cover_url = require("../img/static/course.png");
        const courseDate = this.props.course.start_date;
        const newCourseDate = moment(courseDate).format('MMMM Do YYYY, h:mm:ss a');  

        return(
            <div >
            <Container className="home-event">
            <Row>
                <Col>
                    <h1 className="secondary-header">{this.props.course.coursename}</h1>
                    <p className="main-text">Category:{'  '}{this.props.course.categories}</p>
                    <p className="main-text">Rate:{'  '}{this.props.course.rate}</p>
                    <p className="main-text">{this.props.course.description}</p>
                </Col>
            </Row>
            <Row>
                <Col md="6" xs="12">
                    <img src={this.props.course.cover_url} alt={this.props.course.coursename} />
                    <div className="text-under-img">
                    
                    </div>
                </Col>
                <Col md="6" xs="12">
                    <p className="main-text">Trainer:{'  '}{this.props.course.owner}</p>
                    <p className="main-text">Start:{'  '}{newCourseDate}</p>
                    <p className="main-text">Duration:{'  '}{this.props.course.duration}</p>
                    <p className="main-text">Cost:{'  '}{this.props.course.cost}</p>
                    <p className="main-text">Location:{'  '}{this.props.course.location}</p>
                    <p className="main-text">Limit of members:{'  '}{this.props.course.members_limit}</p>
                </Col>
            </Row>
                <Col>
                    <Button className={`btn-sign ${isAuthenticated("show")}`} color="warning" 
                                        style={{marginRight:'33px'}}>Join</Button>
                    <Button color="secondary" className="btn-sign">Cancel</Button>
                </Col>
            <Row>
            </Row>
            </Container>
            </div>
        )
    }
};