import React from 'react';

import { Container, Row, Button, Col } from 'reactstrap';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { API } from '../api/axiosConf';
import { CommentList, CommentForm } from './EventCommentList';
import { defaultPhoto, isAuthenticated } from '../utils';
import { getUserSubscribeData } from '../api/getUserSubscribeData';


export default class EventDetail extends React.Component{
    constructor(props){
      super(props);
      this.state = {
          comments: [],
          isSubscribed: false,
          loading: true
      };
    }

    getComments = async() => {
        try {
            let response = await API.get('/events/comments',
                {
                    params: {
                        event_id: this.props.event.id,
                    }
                });
            this.setState({
                comments: response.data,
                loading: false
            })
        } catch (error) {
            toast.error(error.message)
        }
    }
    componentDidMount = async() => {
        await this.getComments();
        const event_id = this.props.event.id;
        getUserSubscribeData('event', event_id).then(isUserSubscribed => {
            this.setState({
                isSubscribed: isUserSubscribed
            });
        });
    }

    addComment = async() => {
        await this.getComments();
    }

    addToEvent = async() => {
        const URLPATH = 'user/event/add';
        const USERDATA = { "event_id": this.props.event.id};
        try {
            const response = await API.post(URLPATH, USERDATA);
            if(response.status === 208) 
                toast.info(response.data);
            if(response.status === 201) {
                toast.success(`You subscribe to "${this.props.event.name}"`);
                this.setState({
                    isSubscribed: true
                });
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    subscribeEvent = () => {
        if(localStorage.getItem('token') == null){
            toast.info('You must Sign Up or Sign In for subscribes event');
        } else {
            this.addToEvent();
        }
    }

    unsubscribeEvent = async() => {
        const URL_UNSUBSCRIBE_EVENT = 'user/event/delete';
        const USERDATA = {"params": {"event": this.props.event.id}};
        try {
            await API.delete(URL_UNSUBSCRIBE_EVENT, USERDATA);
            toast.success(`You unsubscribed from "${this.props.event.name}"`);
            this.setState({
                isSubscribed: false
            });
        } catch (error) {
            toast.error(error.message);
        }
    }

    render(){
        let defImg = "/media/beautiful-crowd-cute-2869374.jpg";
        let coverImg = defaultPhoto(defImg, this.props.event.cover_url);
        let eventDate = this.props.event.date;
        let newEventDate = moment.unix(eventDate).format('MMMM Do YYYY, h:mm a');

        return(
            <div className="home-event">

            <div>
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
                     alt={this.props.event.name}>
                     <div className="cd-header">
                     <div className="d-flex justify-content-between container">
                         <h1 className="course-det-header">
                            {(this.state.isSubscribed === 'completed') ? (
                                <span style={{color:'#54DB63'}} title="This event has been finished">
                                    <i className="fas fa-flag-checkered"></i>&nbsp;
                                </span>
                            ) : ''}
                            {this.props.event.name}
                         </h1>
                     </div>
                    </div>
                </div>
                <div className="ed-info-block">
                    <Container className="d-flex flex-wrap">
                        <div className="ed cd-trainer">
                            <i className="fas fa-user-tie"/>
                            <span className="main-text">
                            <Link to="" style={{color:"#fff"}}>
                            {this.props.event.owner}</Link></span>
                        </div>

                        <div className="ed cd-loc">
                            <i className="fas fa-map-marker-alt"></i>
                            <span className="main-text cd-loc">
                            {this.props.event.location}</span>
                        </div>
                        <div className="ed cd-date">
                            <i className="far fa-calendar-alt"></i>
                            <span className="main-text cd-date">
                            {newEventDate}</span>
                        </div>
                    </Container>
                </div>
            </div>
            <Container >
            <Row>
                <Col className="course-detail-first-col">
                    <h4 className="course-detail-h4">About:</h4>
                    <p className="main-text">{this.props.event.description}</p>
                </Col>
            </Row>

            <Row style={{marginTop:'100px'}}>
              <Col md="4"  className = {`pt-3 border-right ${isAuthenticated("show")}`}>
                <h6>Say something about this event</h6>
                    <CommentForm
                        addComment = {this.addComment}
                        event = {this.props.event.id}
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
                <Col  lg='8' md='12' className='d-flex flex-wrap'>
                    {(this.state.isSubscribed !== 'completed') ? (
                        (this.state.isSubscribed) ? (
                            <Button
                                className="btn-sign"
                                color="danger"
                                style={{margin:'0 33px 10px 33px'}}
                                onClick={this.unsubscribeEvent}>Leave the event
                            </Button>
                        ) : (
                            <Button
                                className='btn-sign'
                                color="warning"
                                style={{margin:'0 33px 10px 33px'}}
                                onClick={this.subscribeEvent}>Join to event
                            </Button>
                        )
                    ) : ''}
                    <Link to="/"><Button color="secondary" className="btn-sign" style={{margin:'0 33px 10px 33px'}}>Back</Button></Link>
                </Col>
            </Row>
            </Container>
            </div>
        )
    }
};
