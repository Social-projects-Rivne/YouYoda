import React from 'react';

import { Container, Row, Col, Collapse } from 'reactstrap';
import moment from 'moment';
import { Link } from 'react-scroll';
import { toast } from 'react-toastify';

import { API } from '../api/axiosConf';
import Certificate from './Certificate';
import { CommentList, CommentForm } from './TrainerCommentList';
import Cours from './cours';
import { defaultPhoto, isAuthenticated } from '../utils';
import Event from './event';


export default class TrainerPage extends React.Component{
    constructor(props){
      super(props);
      this.state = {
          cover_url: "",
          comments: [],
          coursesList: [],
          eventsList: [],
          certificateList: [],
          loading: true,
          trainer: {},
          courseCollapse: true,
          eventCollapse: true,
          certificatesCollapse: true,
          generalInfoCollapse: true

      };
    }
    async componentWillMount() {
        try{
            let response = await API.get('trainer/page', {
                params:{
                    "id":this.props.trainer_id
                }
            })
            this.setState({
                trainer: response.data.trainer,
                coursesList: response.data.courses,
                eventsList: response.data.events,
                certificateList: response.data.certificates,
                loading: false
            })

        } catch (error) {
            toast.error(error.message + ' Please, сontact the administration for more information');
        }
        this.getComments();
      }
      lastLogin = (date) => {
        let today = new Date();
        let mins = moment(today).diff(date, "minute")
        let d = 0;
        let h = 0;

        if (mins) {
            if(mins >= 60*24){
                d = Math.floor(mins / (60*24));
                return `${d} days`;
            } else if(mins >= 60){
                h = Math.floor(mins / 60);
                return `${h} hours`;
            } else {
                return `${mins} minutes`;
            }
        } else {
            return "User not logined still"
        }
    }

    getComments = async() => {
        try {
            let response = await API.get('/trainer/comments',
                {
                    params: {
                        trainer_id: this.props.trainer_id,
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

    addComment = async() => {
        await this.getComments()
    }
    toggleCourseCollapse = () => {
        this.setState(state => ({ courseCollapse: !state.courseCollapse }));
    }
    toggleEventCollapse = () => {
        this.setState(state => ({ eventCollapse: !state.eventCollapse }));
    }
    toggleCertCollapse = () => {
        this.setState(state => ({ certificatesCollapse: !state.certificatesCollapse }));
    }
    toggleGeneralCollapse = () => {
        this.setState(state => ({ generalInfoCollapse: !state.generalInfoCollapse }));
    }

    arrowAnimate = (collapse) => {
        if (collapse) {
            return {transform:'rotate(180deg)',
            transition: '.3s transform ease-in-out'};
        }
    }

    render(){
        let defImg = "/media/hot-air-balloons-4381674_1920.jpg";
        let coverImg = defaultPhoto(defImg, this.state.trainer.cover_url);
        let coverAvatar = defaultPhoto(defImg, this.state.trainer.avatar_url)
        let birthDay = moment(this.state.trainer.birth_date).format('Do MMMM YYYY');

        return(

            <div className="trainer-page">
                <div style={{
                        backgroundImage: `url(${coverImg})`,
                        backgroundColor: '#000',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        minWidth:'98vw',
                        height: "40vh",
                        width: '100%',
            }}
                ></div>
                <Container>
                    <Row className="d-flex trainer-page-header">
                        <div className="trainer-avatar">
                            <img src={coverAvatar} alt="trainer avatar"/>
                        </div>
                        <h1>{`${this.state.trainer.first_name} ${this.state.trainer.last_name}`}</h1>
                        <div className="status-offline col">
                            <ul>
                            <li>Last Login</li>
                            <li>
                                <i className="far fa-clock"></i>
                                {this.lastLogin(this.state.trainer.last_login)} ago
                            </li>
                            </ul>

                        </div>
                        <div className="funny-icon">
                            <i className="fas fa-business-time"><span> {this.lastLogin(this.state.trainer.date_joined)} with YouYoda</span></i>
                            <Link href="/about" className="nav-link" activeClass="active" to="trainer-courses" spy={true} smooth={true} duration={500}>
                                <i className="fas fa-hand-spock"><span> {this.state.coursesList.length} Created Courses</span></i>
                            </Link>
                            <Link href="/about" className="nav-link" activeClass="active" to="trainer-events" spy={true} smooth={true} duration={500}>
                                <i className="fas fa-glass-cheers"><span> {this.state.eventsList.length} Organized Events</span></i>
                            </Link>

                        </div>
                    </Row>
                    <Row className="trainer-general-information">
                        <div className="trainer-collapse-header"
                            onClick={this.toggleGeneralCollapse}
                        >
                            <h2>General Information:</h2>
                            <i className="fas fa-chevron-down arrow-collapse" style={this.arrowAnimate(this.state.generalInfoCollapse)}></i>
                        </div>
                        <Collapse isOpen={this.state.generalInfoCollapse} id="coursesCollaps">
                            <ul>
                                <li>
                                    <i className="fas fa-globe-africa"></i>
                                    <span> {this.state.trainer.location}</span>
                                </li>
                                <li>
                                    <i className="fas fa-birthday-cake"></i>
                                    <span> {birthDay}</span>
                                </li>
                                <li>
                                    <i className="fas fa-phone-alt"></i>
                                    <span> {this.state.trainer.phone_number} </span>
                                </li>
                            </ul>
                            <div>
                                <h4><i className="far fa-address-card"></i> About me:</h4>
                                <p>{this.state.trainer.about_me}</p>
                            </div>
                        </Collapse>
                    </Row>
                    <Row className="trainer-courses-list">
                        <div className="trainer-collapse-header"
                            onClick={this.toggleCourseCollapse}
                            id = "trainer-courses"
                        >
                            <h2>Courses:</h2>
                            <i className="fas fa-chevron-down arrow-collapse" style={this.arrowAnimate(this.state.courseCollapse)}></i>
                        </div>
                        <Collapse isOpen={this.state.courseCollapse} id="coursesCollaps">
                            <Cours coursesList = {this.state.coursesList} loading = {this.state.loading} />
                        </Collapse>
                    </Row>
                    <Row className="trainer-events-list">
                        <div className="trainer-collapse-header"
                                onClick={this.toggleEventCollapse}
                                id = "trainer-events"
                        >
                            <h2>Events:</h2>
                            <i className="fas fa-chevron-down arrow-collapse" style={this.arrowAnimate(this.state.eventCollapse)}></i>
                        </div>
                        <Collapse isOpen={this.state.eventCollapse} id="coursesCollaps">
                            <Event eventList = {this.state.eventsList} loading = {this.state.loading}/>
                        </Collapse>

                    </Row>
                    <Row className="trainer-certificates-list">
                        <div className="trainer-collapse-header"
                                onClick={this.toggleCertCollapse}
                        >
                            <h2>Certificates:</h2>
                            <i className="fas fa-chevron-down arrow-collapse" style={this.arrowAnimate(this.state.certificatesCollapse)}></i>
                        </div>
                        <Collapse isOpen={this.state.certificatesCollapse} id="coursesCollaps">
                            <Certificate certificateList = {this.state.certificateList} loading = {this.state.loading}/>
                        </Collapse>
                    </Row>
                    <Row style={{marginTop:'100px', marginBottom:'100px'}}>
                    <Col md="4"  className = {`pt-3 border-right ${isAuthenticated("show")}`}>
                        <h6>Say something about this course</h6>
                            <CommentForm
                                addComment = {this.addComment}
                                trainer = {this.props.trainer_id}
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
                </Container>
            </div>
        )
    }
};

