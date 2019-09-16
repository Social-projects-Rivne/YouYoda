import React from 'react';

import { Container, Row, Button, Col } from 'reactstrap';
import moment from 'moment';
import { Redirect, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { API } from '../api/axiosConf';
import { CommentList, CommentForm } from './EventCommentList';
import { defaultPhoto, isAuthenticated } from '../utils';


export default class EventDetail extends React.Component{
    constructor(props){
      super(props);
      this.state = {
          comments: [],
          loading: true
      };
    }

    getCommnts = async() => {
        try {
            let response = await API.get('/events/comments',
                {
                    params: {
                        event_id: this.props.event.id,
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
    componentWillMount = async() => {
        await this.getCommnts();
      }

    addComment = async() => {
        await this.getCommnts()
    }
    subscribeEvent = () => {
        if(localStorage.getItem('token') == null){
            toast.info('You must Sign Up or Sign In for subscribes event')

        } else {

        }
    }

    render(){
        let defImg = "/media/beautiful-crowd-cute-2869374.jpg";
        let coverImg = defaultPhoto(defImg, this.props.event.cover_url);
        let eventDate = this.props.event.date;
        let newEventDate = moment(eventDate).format('MM Do YY, h:mm a');

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
                            <i class="fas fa-map-marker-alt"></i>
                            <span className="main-text cd-loc">
                            {this.props.event.location}</span>
                        </div>
                        <div className="ed cd-date">
                            <i class="far fa-calendar-alt"></i>
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
                    <Button
                        className='btn-sign'
                        color="warning"
                        style={{margin:'0 33px 10px 33px'}}
                        onClick={this.subscribeEvent}
                    >Join</Button>
                    <Link to="/"><Button color="secondary" className="btn-sign" style={{margin:'0 33px 10px 33px'}}>Back</Button></Link>
                </Col>
            </Row>
            </Container>
            </div>
        )
    }
};
