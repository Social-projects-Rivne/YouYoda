import React from 'react';

import {Container,Row,Button,Col} from 'reactstrap';


export default class HomeCourses extends React.Component{

    render(){

        return(
            <div style={{backgroundColor:'#E8E8E8'}}>
            <Container className="home-event">
            <Row>
                <Col className="header-block">
                    <h1>Top Courses </h1>
                    <p class="main-text">People are busy.
                    So, this UI Kit let’s you customize,
                    build and deploy your landing page,<br/>
                    so you can start selling your product
                    to potential customers.</p>
                </Col>
            </Row>
            <Row>
            <Col xl="4" lg="6" >
                  <div className="home-course">
                    <img src={require("../img/static/course.png")}
                        alt="foto-course" />
                    <h3 className="secondary-header">Course'sTitle</h3>
                    <p className="main-text">People are busy. So, this
                    let’s you customize, build and deploy your landing page,
                    so you can start selling your customers.</p>
                    <Button color="warning" className="btn-yellow" disabled>Details</Button>
                  </div>
            </Col>
            <Col xl="4" lg="6" >
                  <div className="home-course">
                    <img src={require("../img/static/course.png")}
                        alt="foto-course" />
                    <h3 className="secondary-header">Course'sTitle</h3>
                    <p className="main-text">People are busy. So, this
                    let’s you customize, build and deploy your landing page,
                    so you can start selling your customers.</p>
                    <Button color="warning" className="btn-yellow" disabled>Details</Button>
                  </div>
            </Col>
            <Col xl="4" lg="6" >
                  <div className="home-course">
                    <img src={require("../img/static/course.png")}
                        alt="foto-course" />
                    <h3 className="secondary-header">Course'sTitle</h3>
                    <p className="main-text">People are busy. So, this
                    let’s you customize, build and deploy your landing page,
                    so you can start selling your customers.</p>
                    <Button color="warning" className="btn-yellow" disabled>Details</Button>
                  </div>
            </Col>
            <Col xl="4" lg="6" >
                  <div className="home-course">
                    <img src={require("../img/static/course.png")}
                        alt="foto-course" />
                    <h3 className="secondary-header">Course'sTitle</h3>
                    <p className="main-text">People are busy. So, this
                    let’s you customize, build and deploy your landing page,
                    so you can start selling your customers.</p>
                    <Button color="warning" className="btn-yellow" disabled>Details</Button>
                  </div>
            </Col>
            <Col xl="4" lg="6" >
                  <div className="home-course">
                    <img src={require("../img/static/course.png")}
                        alt="foto-course" />
                    <h3 className="secondary-header">Course'sTitle</h3>
                    <p className="main-text">People are busy. So, this
                    let’s you customize, build and deploy your landing page,
                    so you can start selling your customers.</p>
                    <Button color="warning" className="btn-yellow" disabled>Details</Button>
                  </div>
            </Col>
            <Col xl="4" lg="6" >
                  <div className="home-course">
                    <img src={require("../img/static/course.png")}
                        alt="foto-course" />
                    <h3 className="secondary-header">Course'sTitle</h3>
                    <p className="main-text">People are busy. So, this
                    let’s you customize, build and deploy your landing page,
                    so you can start selling your customers.</p>
                    <Button color="warning" className="btn-yellow" disabled>Details</Button>
                  </div>
            </Col>
            </Row>
            </Container>
            </div>
        )
    }
};
