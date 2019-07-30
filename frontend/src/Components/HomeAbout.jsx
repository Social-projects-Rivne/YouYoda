import React from 'react';

import {Container, Row, Col} from 'reactstrap';


export default class HomeAbout extends React.Component{
    render (){
        return(
            <div id="home-about">
            <Container className="home-about">
            <Row>
                <Col className="header-block">
                    <h1>What is YouYoda?</h1>
                    <p class="main-text">People are busy.
                    So, this UI Kit let’s you customize,
                    build and deploy your landing page,<br/>
                    so you can start selling your product
                    to potential customers.</p>
                </Col>
            </Row>
            <Row>
                <Col md="2"><img src={require("../img/static/about.svg")} alt="ico"/>
                </Col>
                <Col md="4">
                    <h3 className="secondary-header">Choose what to learn</h3>
                    <p class="main-text">People are busy. So, this UI Kit let’s
                    you customize, build and deploy your landing page,
                    so you can start selling your product to potential
                    customers.</p>
                </Col>
                <Col md="2"><img src={require("../img/static/about.svg")} alt="ico"/>
                </Col>
                <Col md="4">
                    <h3 className="secondary-header">Find personal coach</h3>
                    <p class="main-text">People are busy. So, this UI Kit let’s
                    you customize, build and deploy your landing page,
                    so you can start selling your product to potential
                    customers.</p>
                </Col>
            </Row>
            <Row>
                <Col md="2"><img src={require("../img/static/about.svg")} alt="ico"/>
                </Col>
                <Col md="4">
                    <h3 className="secondary-header">Learn by doing</h3>
                    <p class="main-text">People are busy. So, this UI Kit let’s
                    you customize, build and deploy your landing page,
                    so you can start selling your product to potential
                    customers.</p>
                </Col>
                <Col md="2"><img src={require("../img/static/about.svg")} alt="ico"/>
                </Col>
                <Col md="4">
                    <h3 className="secondary-header">Make own Events</h3>
                    <p class="main-text">People are busy. So, this UI Kit let’s
                    you customize, build and deploy your landing page,
                    so you can start selling your product to potential
                    customers.</p>
                </Col>
            </Row>
            </Container>
            </div>
        )
    }
};
