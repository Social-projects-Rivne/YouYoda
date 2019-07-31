import React from 'react';

import {Container, Row, Button, Col} from 'reactstrap';
import Slider from "react-slick";


export default class HomeEvent extends React.Component{
    render(){
        const SETTINGS = {
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
        return(
            <div style={{backgroundColor:'#E8E8E8'}}>
            <Container className="home-event">
            <Row>
                <Col className="header-block">
                    <h1>Events near you</h1>
                    <p class="main-text">People are busy.
                    So, this UI Kit let’s you customize,
                    build and deploy your landing page,<br/>
                    so you can start selling your product
                    to potential customers.</p>
                </Col>
            </Row>
            <Row>
            <Col >
                <Slider {...SETTINGS}>
                  <div className="sl-slide">
                    <img src={require("../img/static/event.png")}
                        alt="foto-event" />
                    <h3 className="secondary-header">Event1</h3>
                    <p className="main-text">People are busy. So, this
                    let’s you customize, build and deploy your landing page,
                    so you can start selling your customers.</p>
                    <Button color="warning" className="btn-yellow" disabled>Details</Button>
                  </div>
                  <div className="sl-slide">
                    <img src={require("../img/static/event1.png")}
                        alt="foto-event" />
                    <h3 className="secondary-header">Event2</h3>
                    <p className="main-text">People are busy. So, this
                    let’s you customize, build and deploy your landing page,
                    so you can start selling your customers.</p>
                    <Button color="warning" className="btn-yellow" disabled>Details</Button>
                  </div>
                  <div className="sl-slide">
                    <img src={require("../img/static/event.png")}
                        alt="foto-event" />
                    <h3 className="secondary-header">Event3</h3>
                    <p className="main-text">People are busy. So, this
                    let’s you customize, build and deploy your landing page,
                    so you can start selling your customers.</p>
                    <Button color="warning" className="btn-yellow" disabled>Details</Button>
                  </div>
                  <div className="sl-slide">
                    <img src={require("../img/static/event1.png")}
                        alt="foto-event" />
                    <h3 className="secondary-header">Event4</h3>
                    <p className="main-text">People are busy. So, this
                    let’s you customize, build and deploy your landing page,
                    so you can start selling your customers.</p>
                    <Button color="warning" className="btn-yellow" disabled>Details</Button>
                  </div>
                </Slider>
            </Col>
            </Row>
            </Container>
            </div>
        )
    }
};