import React from 'react';

import { Container, Row, Button, Col, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import moment from 'moment';
import Slider from "react-slick";
import { Link } from 'react-router-dom';

import { axiosGet } from '../api/axiosGet';
import { API } from '../api/axiosConf';
import { defaultPhoto } from '../utils';
import { getUserSubscribeData } from '../api/getUserSubscribeData';
import { toast } from 'react-toastify';


export default class HomeEvent extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            modal: false,
            eventsList: [{}],
            isSubscribed: false,
        };
    }

    toggle = (event) => {
        const event_id = event.id;
        getUserSubscribeData('event', event_id).then(isUserSubscribed => {
            this.setState({
                isSubscribed: isUserSubscribed
            });
        });
        this.setState(prevState => ({
            modal: !prevState.modal,
            event
        }));
    }

    async componentWillMount() {
        let path = 'events/top'
        let listEvents = await axiosGet(path);
        this.setState({
            eventsList: listEvents,
        });
    }

    addToEvent = async() => {
        const URLPATH = 'user/event/add';
        const USERDATA = { "event_id": this.state.event.id};
        try {
            const response = await API.post(URLPATH, USERDATA);
            if(response.status === 208)
                toast.info(response.data);
            if(response.status === 201) {
                toast.success('You subscribed to "' + this.state.event.name + '"');
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
            toast.info('You must Sign Up or Sign In for subscribes event')

        } else {
            this.addToEvent()
        }
    }

    renderEvents(event) {

        let defImg = "/media/beautiful-crowd-cute-2869374.jpg";
        let coverImg = defaultPhoto(defImg, event.cover_url);

        return (
            <div className="sl-slide" id={`event_${event.id}`} key={event.id}>
                <div className="event-cover-photo">
                    <img src={coverImg} alt={event.name} className="event-cover-photo"/>
                </div>
                <h3 className="secondary-header">{event.name}</h3>
                <p className="main-text event-description">{event.description}</p>
                <div>
                    <Button color="warning"
                            className="btn-yellow"
                            onClick={() => this.toggle(event)}>{this.props.buttonLabel}Details
                    </Button>
                </div>
            </div>
        )
    }

    render(){
        let settings = {
          dots: false,
          infinite: true,
          slidesToShow: 2,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 5000,
          responsive: [
              {
                breakpoint: 993,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                },
                breakpoint: 550,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false
                }
            },
          ]
        };

       const event = this.state.event || this.state.eventsList[0];
       const closeBtn = <button className="close" onClick={this.toggle}>&times;</button>;
       const eventDate = event.date;
       const newEventDate = moment.unix(eventDate).format('MMMM Do YYYY, h:mm a');
       let defImg = "/media/beautiful-crowd-cute-2869374.jpg";
       let coverImg = defaultPhoto(defImg, event.cover_url);

        return(
            <div style={{backgroundColor:'#E8E8E8'}} id="home-event">
                <Container className="home-event">
                    <Row>
                        <Col className="header-block">
                            <h1>Events near you</h1>
                            <p className="main-text">People are busy.
                            So, this UI Kit let’s you customize,
                            build and deploy your landing page,<br/>
                            so you can start selling your product
                            to potential customers.</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col >
                            <Slider {...settings}>
                                {this.state.eventsList.map( event => this.renderEvents(event) )}
                            </Slider>
                            <Modal isOpen={this.state.modal} className={this.props.className} id="modal-event-content">
                                <ModalHeader toggle={this.toggle} close={closeBtn}>
                                    <h4 className="secondary-header">
                                        {(this.state.isSubscribed === 'completed') ? (
                                            <span style={{color:'#54DB63'}} title="This event has been finished">
                                                <i className="fas fa-flag-checkered"></i>&nbsp;
                                            </span>
                                        ) : (
                                            (this.state.isSubscribed) ? (
                                                <span style={{color:'#54DB63'}} title="You have already joined">
                                                    <i className="fas fa-check"></i>&nbsp;
                                                </span>
                                            ) : ''
                                        )}
                                        {event.name}
                                    </h4>
                                    <p className="main-category">Category:  {event.categories}</p>
                                    <p className="main-text-event-modal">{event.description}</p>
                                </ModalHeader>
                                <ModalBody>
                                    <img src={coverImg} alt={event.name} className="event-modal-photo"/>
                                    <p className="main-text">Location: {event.location}</p>
                                    <p className="main-text">Date: {newEventDate}</p>
                                </ModalBody>
                                <ModalFooter className="event-footer-centered">
                                    {(!this.state.isSubscribed) ? (
                                        <Button className="btn-join"
                                                color="warning"
                                                style={{marginRight:'33px'}}
                                                onClick={this.subscribeEvent}>Join to event
                                        </Button>
                                    ) : ''}
                                    <Button color="secondary"
                                            className='btn-event-modal-cancel'
                                            onClick={this.toggle}>Cancel
                                    </Button>
                                </ModalFooter>
                            </Modal>
                        </Col>
                    </Row>
                    <Row className="d-flex justify-content-end">
                        <Link to="/events/search">
                            <div className="more-courses-events">
                                <button className="learn-more">
                                    <div className="circle">
                                    <span className="icon arrow"></span>
                                    </div>
                                    <p className="button-text">More Events</p>
                                </button>
                            </div>
                        </Link>
                    </Row>
                </Container>
            </div>
        )
    }
};
