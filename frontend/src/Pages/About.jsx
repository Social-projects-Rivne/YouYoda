import React from 'react';

import { Container, Row, Col } from 'reactstrap';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import '../style/about.scss';

import LoginForm from '../Components/LoginForm';
import Registration from '../Components/Registration';


export default class About extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpenL: false,
            isOpen: false
        };
    }
    handleClickReg = () => {
        this.setState(prevState => ({
            isOpen: !prevState.isOpen
        }));
    }
    handleClickLogin = () => {
        this.setState(prevState => ({
            isOpenL: !prevState.isOpenL
        }));
    }

    render() {
        return (
            <>
                <div className="about-us">
                    <h1 className="head-text">ABOUT US</h1>
                    <div className="info">
                        <Container >
                            <p className="info-text">
                                YOUYODA: EPISODE I<br />
                                A long time ago in a galaxy far, far away...<br />
                                Team of python/web-ui developers decided to make an incredible web-application for self developing, studying and attending events<br />
                                Our Mission Founded in 2019<br />
                                YouYoda’s mission is to give people the power to build community and bring the world closer together.<br />
                                People use our products to stay connected with friends and family, to discover what’s going on in the world, and to share and express what matters to them.<br />
                                Our mission is what drives us to do everything possible to expand human potential. We do that by creating groundbreaking sport innovations, by making our products more sustainably, by building a creative and diverse global team and by making a positive impact in communities where we live and work.
                            </p>
                        </Container>
                    </div>
                </div>


                <Container>
                    <Row className="team">
                        <h1 className="team-head">DEVELOPED BY</h1>
                        <Col className="column-team" xl="4" md="6">
                            <img src={require("../img/static/avatar.png")} alt="ico" />
                            <div className="circle">
                                <div className="circle-text">
                                    <p>Hi, my name is Helen. I love programming, music and cakes.<br />
                                        I code using Python, PHP, JavaScript, HTML, CSS.<br />
                                        I'm searching harmony in the life, doing yoga and I need to study every day as web-developer. My experience contains about 8 years of creating web-sites and internet stores using different CMS APIs, PHP and JS.<br /></p>
                                    <ul>
                                        <h5>Worked on:</h5>
                                        <li>Forgot password system </li>
                                        <li>Ability to activate account </li>
                                        <li>Notification and comment system </li>
                                        <li>Course and event details pages </li>
                                        <li>A method of searching, filtering, sorting courses and events </li>
                                        <li>UI part of Homepage, PDP </li>
                                        <li>Public page of trainers </li>
                                        <li>Course schedule  </li>
                                    </ul>
                                </div>
                            </div>
                            <h1>NAZAR BOIAR</h1>
                            <h3>Software Engineer</h3>
                        </Col>
                        <Col className="column-team" xl="4" md="6">
                            <img src={require("../img/static/avatar.png")} alt="ico" />
                            <div className="circle" />
                            <h1>OLEKSANDR HAVRYLCHYK</h1>
                            <h3>Software Engineer</h3>
                        </Col>
                        <Col className="column-team" xl="4" md="6">
                            <img src={require("../img/static/avatar.png")} alt="ico" />
                            <div className="circle" />
                            <h1>HRYHORII KUCHERCHUK</h1>
                            <h3>Software Engineer</h3>
                        </Col>
                        <Col className="column-team" xl="4" md="6">
                            <img src={require("../img/static/avatar.png")} alt="ico" />
                            <div className="circle" />
                            <h1>OLENA PODRANETSKA</h1>
                            <h3>Software Engineer</h3>
                        </Col>
                        <Col className="column-team" xl="4" md="6">
                            <img src={require("../img/static/avatar.png")} alt="ico" />
                            <div className="circle" />
                            <h1>MARYNA POPRUZHUK</h1>
                            <h3>Software Engineer</h3>
                        </Col>
                        <Col className="column-team" xl="4" md="6">
                            <img src={require("../img/static/avatar.png")} alt="ico" />
                            <div className="circle">
                                <div className="circle-text">
                                    <p>Hi, I'm Roman. I'm fond of snowboarding, powerlifting, cooking and hiking.<br />
                                        I'm coding using Python, JS, React, Css<br /></p>
                                    <ul>
                                        <h5>Worked on:</h5>
                                        <li>UI part for fill/edit profile page</li>
                                        <li>UI part for changing user role from "User" to "Trainer"</li>
                                        <li>UI part for organizing events</li>
                                        <li>Implemented method for organizing, managing events</li>
                                        <li>Implemented method for saving user photos to the content folder and viewing it on the profile page</li>
                                    </ul>
                                </div>
                            </div>
                            <h1>RUSYN ROMAN</h1>
                            <h3>Software Engineer</h3>
                        </Col>
                    </Row>
                </Container>


                <div className="possibilities">
                    <Container>
                        <Row>
                            <LoginForm handleClickLogin={this.handleClickLogin} handleClickReg={this.handleClickReg} isOpenL={this.state.isOpenL} />
                            <Registration handleClickReg={this.handleClickReg} handleClickLogin={this.handleClickLogin} isOpen={this.state.isOpen} />
                            <h1>After all you can:</h1>
                            <h3>View our home page, look for public events, courses and trainers</h3>
                            <Col className="column-possibilities" xl="6" md="12">
                                <h4>Sign up<Button onClick={this.handleClickReg} className='btn-sign' color="warning">Become jedi</Button></h4>
                            </Col>
                            <Col className="column-possibilities" xl="6" md="12">
                                <h4>Sign in<Button onClick={this.handleClickLogin} className='btn-sign' color="warning">Feel the force</Button></h4>
                            </Col>
                            <h3>When you signed in, join events, courses</h3>
                            <Col className="column-possibilities" xl="6" md="12">
                                <h4>Go to events<Link to="/events/search">
                                    <Button onClick="" className='btn-sign' color="warning">Meet up with Yoda</Button>
                                </Link></h4>
                            </Col>
                            <Col className="column-possibilities" xl="6" md="12">
                                <h4>Go to courses<Link to="/courses/search">
                                    <Button className='btn-sign' color="warning">Learn how to control your force</Button>
                                </Link></h4>
                            </Col>
                            <h3>Or become trainer to create your own courses/events</h3>
                            <Col className="column-possibilities" xl="6" md="12">
                                <h4>Become trainer<Link to="/editprofile">
                                    <Button className='btn-sign' color="warning">Become jedi instructor</Button>
                                </Link></h4>
                            </Col>
                            <Col className="column-possibilities" xl="6" md="12">
                                <h4>Go to trainer page<Link to="/trainers">
                                    <Button className='btn-sign' color="warning">Find your jedi instructor</Button>
                                </Link></h4>
                            </Col>
                            <h3>Also you can develop yourself as a plain user by PDP(Personal Development Plan) system</h3>
                            <Col className="column-possibilities">
                                <h4>Go to your PDP page<Link to="/profile">
                                    <Button className='btn-sign' color="warning">Learn jedi skills on your own</Button>
                                </Link></h4>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </>
        )
    }
};