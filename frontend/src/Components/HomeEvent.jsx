import React from 'react';

import { Container, Row, Button, Col } from 'reactstrap';
import Slider from "react-slick";

import { axiosGet } from '../api/axiosGet';


export default class HomeEvent extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            eventsList: [ {
   "name": "Event-5",
   "description": "Perfect for people who never swam",
   "cover_url": ""
 },
 {
   "name": "Event-4",
   "description": "Perfect for people who never swam",
   "cover_url": ""
 },
 {
   "name": "Event-3",
   "description": "Perfect for people who never swam",
   "cover_url": ""
 },
 {
   "name": "Event-2",
   "description": "Perfect for people who never swam",
   "cover_url": ""
 }],
        };
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
        if(!event.cover_url)
            event.cover_url = require("../img/static/event.png");
        return (
            <div className="sl-slide" id={`event_${event.id}`} key={event.id}>
                <img src={event.cover_url} alt={event.name}/>
                <h3 className="secondary-header">{event.name}</h3>
                <p className="main-text">{event.description}</p>
                <Button color="warning" className="btn-yellow" disabled>Details</Button>
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
