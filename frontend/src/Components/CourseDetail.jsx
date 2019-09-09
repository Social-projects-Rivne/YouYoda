import React from 'react';

import StarRatingComponent from 'react-star-rating-component';
import moment from 'moment';
import { Container,Row,Button,Col } from 'reactstrap';
import { Redirect, Link } from 'react-router-dom';
import Calendar from '@lls/react-light-calendar'

import { defaultPhoto, isAuthenticated } from '../utils';
import { CommentList, CommentForm } from './CommentList'

export default class CourseDetail extends React.Component{
    constructor(props){
      super(props);
      this.state = {
          comments: []
      };
    }
    // componentDidMount() {
    //   fetch("http://localhost:7777")
    //     .then(res => res.json())
    //     .then(res => {
    //       this.setState({
    //         comments: res,
    //         loading: false
    //       });
    //     })
    //     .catch(err => {
    //       this.setState({ loading: false });
    //     });
    // }
    addComment = (comment) => {
        this.setState({
          comments: [comment, ...this.state.comments]
        });
    }

    render(){
        let defimg = "/media/car-racing-4394450_1920.jpg";
        let coverimg = defaultPhoto(defimg, this.props.course.cover_url);
        let courseDate = this.props.course.start_date;
        let newCourseDate = moment(courseDate).format('MMMM Do YYYY, h:mm:ss a');
        let courseDuration = this.props.course.duration;
        let newCourseDuration = moment.duration(courseDuration).days();
        let date = new Date(courseDate);
        let startDate = date.getTime()
        let endDate = new Date(startDate).setDate(date.getDate() + newCourseDuration)
        let statuscolor;
        if(this.props.course.status == "Open"){
            statuscolor = "#54DB63"
        } else if (this.props.course.status == "Closed") {
            statuscolor = "#FC5252"
        } else {
            statuscolor = "#2E3192"
        }
        return(
            <div >
            <Container className="home-event">
            <Row>
                <Col className="d-flex justify-content-between">
                    <h1 className="course-det-header">
                        {this.props.course.coursename}
                        <span className="course-detail-status" style={{color:statuscolor}}>
                            {this.props.course.status}
                        </span>
                    </h1>
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
                    <img style={{maxWidth: "100%", height: "auto", width: '100%'}} src={coverimg} alt={this.props.course.coursename} />
                    <h4 className="course-detail-h4">About:</h4>
                    <p className="main-text">{this.props.course.description}</p>
                </Col>
            </Row>
            <Row>
                <Col md="6" xs="12" className="course-detail-first-col">
                    <p className="main-text"><span className="main-text-span">Category: </span><Link to="" style={{color:"#000"}}>{this.props.course.categories}</Link></p>
                    <p className="main-text">Trainer: <Link to="" style={{color:"#000"}}>{this.props.course.owner}</Link></p>
                    <p className="main-text"><span className="main-text-span">Start: </span> {newCourseDate}</p>
                    <p className="main-text">Duration: {newCourseDuration} days </p>
                    <p className="main-text"><span className="main-text-span">Cost: </span> {this.props.course.cost} $</p>
                    <p className="main-text">Location: {this.props.course.location}</p>
                    <p className="main-text"><span className="main-text-span">Limit of members: </span> {this.props.course.members_limit}</p>
                </Col>
                <Col md="6" xs="12" className="course-detail-second-col">
                    <Calendar startDate={startDate} endDate={endDate} />
                </Col>
            </Row>
            <Row style={{marginTop:'100px'}}>
              <Col md="4"  className = "pt-3 border-right">
                <h6>Say something about React</h6>
                    <CommentForm addComment={this.addComment}/>
              </Col>
              <Col md="8"  className = "pt-3 bg-white">
                  <CommentList
                     comments={this.state.comments}
                    />
              </Col>
            </Row>


                <Col xs="12" className="btn-group-course-detail d-flex justify-content-between">
                    <Button className={`btn-sign ${isAuthenticated("show")}`} color="warning"
                                        style={{marginRight:'33px'}}>Join</Button>
                    <Link to="/"><Button color="secondary" className="btn-sign">Cancel</Button></Link>
                </Col>
            <Row>
            </Row>
            </Container>
            </div>
        )
    }
};
