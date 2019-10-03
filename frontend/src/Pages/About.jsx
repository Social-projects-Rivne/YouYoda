import React from 'react';

import { Container, Row, Col } from 'reactstrap';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import '../style/about.css';


export default class About extends React.Component {
    render() {
        return (
            <>
                <div className="about-us">
                    <h1 className="head-text">ABOUT US</h1>
                    <div className="info">
                        <Container >
                            <p className="info-text">
                                YOUYODA: EPISODE I<br /><br />
                                A long time ago in a galaxy far, far away...<br /><br />
                                Team of python/web-ui developers decided to make an incredible web-application for self developing, studying and attending events<br /><br />
                                Our Mission Founded in 2019<br />YouYoda’s mission is to give people the power to build community and bring the world closer together.<br /><br />
                                People use our products to stay connected with friends and family, to discover what’s going on in the world, and to share and express what matters to them.
                                </p>
                        </Container>
                    </div>
                </div>

                <Container>
                    <Row className="team">
                        <Col xl="4" md="6">
                            <img src={require("../img/static/avatar.png")} alt="ico"/>
                            <h1>NAZAR BOIAR</h1>
                            <h3>Software Engineer</h3>
                        </Col>
                        <Col xl="4" md="6">
                            <img src={require("../img/static/avatar.png")} alt="ico"/>
                        </Col>
                        <Col xl="4" md="6">
                            <img src={require("../img/static/avatar.png")} alt="ico"/>
                        </Col>
                        <Col xl="4" md="6">
                            <img src={require("../img/static/avatar.png")} alt="ico"/>
                        </Col>
                        <Col xl="4" md="6">
                            <img src={require("../img/static/avatar.png")} alt="ico"/>
                        </Col>
                        <Col xl="4" md="6">
                            <img src={require("../img/static/avatar.png")} alt="ico"/>
                        </Col>
                    </Row>
                </Container>

                <div className="possibilities">
                    <Container>

                    </Container>
                </div>
            </>
        )
    }
};