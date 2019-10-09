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
                                Team of python/web-ui developers decided to make an incredible web-application for self developing, studying things and attending events<br />
                                Our Mission Founded in 2019<br />
                                YouYoda’s mission is to give people the power to build community and bring the world closer together, give everyone possibility to become more experienced in any direction<br />
                                People use our product to stay connected like-minded persons, to stay tuned with all what they interested in , to discover what’s going on near them and to learn something what they want<br />
                                We hope that you are enjoyed our project, that you found what you were looking for<br />
                                We are so glad that we can help someone and gather the people together<br />
                                Join us, use YouYoda!<br />
                            </p>
                        </Container>
                    </div>
                </div>


                <Container>
                    <Row className="team">
                        <h1 className="team-head">DEVELOPED BY</h1>
                        <Col className="column-team" xl="4" md="6">
                            <img src={require("../img/static/team/Nazar.png")} alt="ico" />
                            <div className="circle">
                                <div className="circle-text">
                                    <p>
                                        Hi, I love programming, hiking and riding a bike.
                                        For make some incredible, I use Python, Django, React, SCSS.<br/>
                                        I believe that there is no impossible - there is insufficient motivation.
                                        If you believe that a person must constantly develop and there is no fate,
                                        but there is a reticular formation. Join us, use YouYoda!<br/>
                                    </p>
                                    <ul>
                                        <h5>Worked on:</h5>
                                        <li>A method of searching, filtering, sorting courses and events</li>
                                        <li>Notification and comment system</li>
                                        <li>Course and event details pages</li>
                                        <li>UI part of Homepage, PDP</li>
                                        <li>Ability to activate account</li>
                                        <li>Forgot password system</li>
                                        <li>Public page of trainers</li>
                                        <li>Course schedule</li>
                                    </ul>
                                </div>
                            </div>
                            <h1>NAZAR BOIAR</h1>
                            <h3>Software Engineer</h3>
                        </Col>
                        <Col className="column-team" xl="4" md="6">
                            <img src={require("../img/static/team/Oleksandr.jpg")} alt="ico" />
                            <div className="circle">
                                <div className="circle-text">
                                    <p>
                                        Hello, I am Oleksandr. I really enjoyed working on this project, 
                                        I hope that our project will be useful and interesting for you to read.<br/>
                                        Join us, use YouYoda!<br />
                                    </p>
                                    <ul>
                                        <h5>Worked on:</h5>
                                        <li>Registration via social networks</li>
                                        <li>Login via social networks</li>
                                        <li>Create course possibility</li>
                                        <li>Change role possibility</li>
                                        <li>Profile page</li>
                                    </ul>
                                </div>
                            </div>
                            <h1>OLEKSANDR HAVRYLCHYK</h1>
                            <h3>Software Engineer</h3>
                        </Col>
                        <Col className="column-team" xl="4" md="6">
                            <img src={require("../img/static/team/Hryhorii.jpg")} alt="ico" />
                            <div className="circle">
                                <div className="circle-text">
                                    <p>
                                        Hello, I am a young developer. I love programming, music and great stories.
                                        I am very excited to work on this project with all team. I've improved my Python, JS, React and UI skills a lot while was working!
                                        Also i have experience to work using C# and C++ and  i like to learn new programming langs and features<br />
                                        Get busy living or get busy dying. Join us, use YouYoda!<br />
                                    </p>
                                    <ul>
                                        <h5>Worked on:</h5>
                                        <li> Backend for regular sign in/sign up and logout </li>
                                        <li> Implementing Bulk-operations for moderation </li>
                                        <li> Managing users and their statuses as an admin</li>
                                        <li> Modifying admin page ui</li>
                                        <li> Basic migrations</li>
                                        <li> Basic db models</li>
                                        <li> About page</li>
                                    </ul>
                                </div>
                            </div>
                            <h1>HRYHORII KUCHERCHUK</h1>
                            <h3>Software Engineer</h3>
                        </Col>
                        <Col className="column-team" xl="4" md="6">
                            <img src={require("../img/static/team/Olena.png")} alt="ico" />
                            <div className="circle">
                                <div className="circle-text">
                                    <p>
                                        Hi, my name is Helen. I love programming, music and cakes.
                                        I code using Python, PHP, JavaScript, HTML, CSS.
                                        I'm searching harmony in the life, doing yoga and I need to study every day as web-developer. 
                                        My experience contains about 8 years of creating web-sites and internet stores using different CMS APIs, PHP and JS.<br />
                                        I understand how important is to motivate yourself and improve own skills. So our project can help people like me. 
                                        Join us, use YouYoda!<br />
                                    </p>
                                    <ul>
                                        <h5>Worked on:</h5>
                                        <li>All methods and inteface for managing user subscribed courses and events</li>
                                        <li>Searching page and method for site searching, history routes</li>
                                        <li>All methods for user requests to become trainer</li>
                                        <li>UI and Backend methods for viewing users table</li>
                                        <li>UI for users registration with validation</li>
                                        <li>Moderator interface for managing requests</li>
                                        <li>Admin and Moderator Dashboards</li>
                                        <li>Develop logo idea</li>
                                        <li>404 error page</li>
                                    </ul>
                                </div>
                            </div>
                            <h1>OLENA PODRANETSKA</h1>
                            <h3>Software Engineer</h3>
                        </Col>
                        <Col className="column-team" xl="4" md="6">
                            <img src={require("../img/static/team/Maryna.jpg")} alt="ico" />
                            <div className="circle">
                                <div className="circle-text">
                                <p>
                                    My name is Maryna. I am a beginner developer. I love programming, reading and pilates.<br/>
                                    This project has helped me to improve my skills, learn new technologies, become part of a team, 
                                    meet interesting people and change my life for the better and I want everyone to be able to do it with YouYoda.
                                    Join us, use YouYoda!<br/>
                                </p>
                                <ul>
                                        <h5>Worked on:</h5>
                                        <li> Searching, filtering, sorting courses page</li>
                                        <li> Searching, filtering, sorting events page</li>
                                        <li> The methods for edit, view user profile</li>
                                        <li> The methods for view, edit PDP </li>
                                        <li> Course details page (partially)</li>
                                        <li> Event details page (partially)</li>
                                        <li> Courses, events on homepage</li>
                                        <li> Event details modal window</li>
                                        <li> Trainer profile (partially)</li>
                                        <li> Axios headers defaults</li>
                                        <li> Joine to course, event</li>
                                        <li> Login page</li>
                                    </ul>
                                </div>
                            </div>
                            <h1>MARYNA POPRUZHUK</h1>
                            <h3>Software Engineer</h3>
                        </Col>
                        <Col className="column-team" xl="4" md="6">
                            <img src={require("../img/static/team/Roman.png")} alt="ico" />
                            <div className="circle">
                                <div className="circle-text">
                                    <p>
                                        Hi, I'm Roman. I'm fond of snowboarding, powerlifting, cooking and hiking.<br />
                                        I'm coding using Python, JS, React, Css<br />
                                        I am a beginner developer and this project improved my skills, I learned a lot of new with my team and it`s the best experience
                                        Join us, use YouYoda!<br/>
                                    </p>
                                    <ul>
                                        <h5>Worked on:</h5>
                                        <li>Implemented method for saving user photos to the content folder and viewing it on the profile page</li>
                                        <li>UI part for changing user role from "User" to "Trainer"</li>
                                        <li>Implemented method for organizing, managing events</li>
                                        <li>UI part for fill/edit profile page</li>
                                        <li>UI part for organizing events</li>
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