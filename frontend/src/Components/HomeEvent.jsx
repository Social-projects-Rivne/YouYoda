import React from 'react';

import { Container, Row, Button, Col, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Slider from "react-slick";

import { axiosGet } from '../api/axiosGet';


export default class HomeEvent extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            modal: false,
            eventsList: [ {
   "name": "Event-5",
   "description": "Perfect for people who never swam",
   "date": "2019-08-28T10:26:37.438766+03:00",
   "cover_url": "",
   "location": "Rivne, Ukraine"
 },
 {
   "name": "Event-4",
   "description": "Perfect for people who never swam",
   "date": "2019-08-28T10:26:37.438199+03:00",
   "cover_url": "",
   "location": "Rivne, Ukraine"
 },
 {
   "name": "Event-3",
   "description": "Perfect for people who never swam",
   "date": "2019-08-28T10:26:37.437632+03:00",
   "cover_url": "",
   "location": "Lviv, Ukraine"
 },
 {
   "name": "Event-2",
   "description": "Perfect for people who never swam",
   "date": "2019-08-28T10:26:37.436932+03:00",
   "cover_url": "",
   "location": "Rivne, Ukraine"
 }],
        };

        this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

    componentWillMount() {
        let path = 'events/top'
        let eventsList = axiosGet(path);
        eventsList.then( valueEvents => {
            this.setState({
                eventsList: valueEvents,
            });  
        });
    }

    renderEvents(event) {
        const closeBtn = <button className="close" onClick={this.toggle}>&times;</button>;
        if(!event.cover_url)
            event.cover_url = require("../img/static/event.png");
        return (
            <div className="sl-slide" id={`event_${event.id}`} key={event.id}>
                <img src={event.cover_url} alt={event.name}/>
                <h3 className="secondary-header">{event.name}</h3>
                <p className="main-text">{event.description}</p>
                <div>
        <Button color="warning" className="btn-yellow" onClick={this.toggle}>{this.props.buttonLabel}Details</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle} close={closeBtn}><h4 className="secondary-header">{event.name}</h4></ModalHeader>
          <ModalBody>
            <img src={event.cover_url} alt={event.name}/>
            <p className="main-text">{event.description}</p>
            <p className="main-text">{event.location}</p>
            <p className="main-text">{event.date}</p>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
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
                }
            },
          ]
        };

       console.log(this.state.eventList);   


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
            </Col>
            </Row>
            </Container>
            </div>
        )
    }
};
