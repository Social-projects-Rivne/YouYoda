import React from 'react';

import { Container,Row,Button,Col } from 'reactstrap';
import moment from 'moment';
import { Link } from 'react-router-dom';
import StarRatingComponent from 'react-star-rating-component';
import { toast } from 'react-toastify';
import DayPicker from 'react-day-picker';

import { API } from '../api/axiosConf';
import { CommentList, CommentForm } from './CommentList';
import { defaultPhoto, isAuthenticated } from '../utils';


const URLPATH = 'user/course/add';

export default class CourseDetail extends React.Component{
    constructor(props){
      super(props);
      this.state = {
          comments: [],
          schedule: [],
          firstDate: 1569936600,
          loading: true
      };
    }
    getSchedule = async() => {
        try {
            let response = await API.get('/courses/schedule', {
                    params: {
                        course_id: this.props.course.id,
                    }
                }
            )
            this.setState({
                schedule: response.data,
                firstDate: response.data[0].date
            })
        } catch (error) {
            toast.error(error.message)
        }
    }
    getComments = async() => {
        try {
            let response = await API.get('/courses/comments',
                {
                    params: {
                        course_id: this.props.course.id,
                    }
                }
            )   
            this.setState({
                comments: response.data,
                loading: false
            })
        } catch (error) {
            toast.error(error.message)
        }
    }

    componentWillMount = () => {
        this.getSchedule();
        this.getComments();
      }

    addComment = async() => {
        await this.getComments()
    }

    addToCourse = async() => {
        let userdata = { "course_id": this.props.course.id};
        try {
            const response = await API.post(URLPATH, userdata);
            if(response.status === 208)
                toast.info(response.data);
            if(response.status === 201)
                toast.success('You subscribe to ' + this.props.course.coursename);
        } catch (error) {
            toast.error(error.message)
        }
    }

    subscribeCourse = () => {
        if(localStorage.getItem('token') === null){
            toast.info('You must Sign Up or Sign In for subscribes course')
        } else {
            this.addToCourse()
        }
    }
    render(){
        let defImg = "/media/car-racing-4394450_1920.jpg";
        let coverImg = defaultPhoto(defImg, this.props.course.cover_url);
        const courseDate = this.props.course.start_date;
        let newCourseDate = moment.unix(courseDate).format('Do MM, h:mm a');
        let courseDuration = this.props.course.duration;
        let newCourseDuration = moment.duration(courseDuration).hours();

        let scheduleList = this.state.schedule.map((item) => {
            return new Date(moment.unix(item.date).format("MM, DD, YYYY"))
        })

        let statuscolor;
        if(this.props.course.status === "Open"){
            statuscolor = "#54DB63"
        } else if (this.props.course.status === "Closed") {
            statuscolor = "#FC5252"
        } else {
            statuscolor = "#ffce54"
        }
        return(

            <div className="home-event ">
                <div className='cd-header'>
                <div className="d-flex justify-content-between flex-wrap container">
                    <h1 className="course-det-header">
                        <Button
                            className='btn'
                            color="warning"
                            style={{margin:'0 15px 10px 0'}}
                            onClick={this.subscribeCourse}
                        >Join</Button>
                        {this.props.course.coursename}
                        <span className="course-detail-status" style={{color:statuscolor}}>
                            {this.props.course.status}
                        </span>
                    </h1>
                    <div className="main-text star d-flex">
                        <StarRatingComponent starCount={10} className="course-star-rating"
                                             value={this.props.course.rate} />
                        <div className="rate-num">
                            <span className="rate-big">{this.props.course.rate}/</span>
                            <span className="rate-small">10</span>
                        </div>
                    </div>
                </div>
                </div>
                <div >
                    <div style={{
                            minHeight: '510px',
                            backgroundImage: `url(${coverImg})`,
                            backgroundColor: '#000',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'cover',
                            minWidth:'98vw',
                            height: "94vh",
                            width: '100%'
                        }}
                         alt={this.props.course.coursename}></div>

                    <div className="cd-info-block">
                        <Container className="d-flex flex-wrap">
                        <div className="cd cd-trainer">
                            <i className="fas fa-user-tie"/>
                            <span className="main-text">
                                <Link to={{
                                        pathname: '/trainer/page',
                                        state: {'trainer_id':this.props.course.owner.id}
                                    }} style={{color:"#fff"}}
                                >
                                    {`${this.props.course.owner.first_name} ${this.props.course.owner.last_name}`}
                                </Link>
                            </span>
                        </div>
                        <div className="cd cd-cost">
                            <i class="fas fa-dollar-sign"></i>
                            <span className="main-text">
                                {this.props.course.cost}</span>
                        </div>
                        <div className="cd cd-loc">
                            <i class="fas fa-map-marker-alt"></i>
                            <span className="main-text cd-loc">
                                {this.props.course.location}</span>
                        </div>
                        <div className="cd cd-date">
                            <i class="far fa-calendar-alt"></i>
                            <span className="main-text cd-date">
                                {newCourseDate}</span>
                        </div>
                        </Container>
                    </div>
                </div>

            <Container>
            <Row>
                <Col md="6" xs="12" className="course-detail-first-col">
                    <h4 className="course-detail-h4">About:</h4>
                    <p className="main-text">{this.props.course.description}</p>
                    <p className="main-text cd-limit" ><span className="main-text-span">Limit of members: </span> {this.props.course.members_limit}</p>
                    <p className="main-text">Duration: {newCourseDuration} hours</p>
                    <p className="main-text"><span className="main-text-span">Category: </span><Link to="" style={{color:"#000"}}>{this.props.course.categories}</Link></p>
                </Col>
                <Col md="6" xs="12" className="course-detail-second-col" >
                    <DayPicker
                        month = {new Date(moment.unix(this.state.firstDate))}
                        selectedDays={scheduleList}
                    />

                </Col>
            </Row>

            <Row style={{marginTop:'100px'}}>
              <Col md="4"  className = {`pt-3 border-right ${isAuthenticated("show")}`}>
                <h6>Say something about this course</h6>
                    <CommentForm
                        addComment = {this.addComment}
                        course = {this.props.course.id}
                        comments = {this.state.comments}
                    />
              </Col>
              <Col className = "pt-3 bg-white">
                  <CommentList
                     comments = {this.state.comments}
                     loading = {this.state.loading}
                    />
              </Col>
            </Row>
            <Row className="btn-group-course-detail d-flex justify-content-between">
                <Col>
                </Col>
                <Col lg='8' md='12' className='d-flex'>
                    <Button
                    className='btn-sign'
                    color="warning"
                    style={{margin:'0 33px 10px 33px'}}
                    onClick={this.subscribeCourse}
                    >Subscribe</Button>
                    <Link to="/"><Button color="secondary" className="btn-sign" style={{margin:'0 33px 10px 33px'}}>Back</Button></Link>
                </Col>
            </Row>

            </Container>
            </div>

        )
    }
};
