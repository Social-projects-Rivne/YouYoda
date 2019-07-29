import React from 'react';
import {Container,
Row,
Col} from 'reactstrap';


class HomeTrainers extends React.Component{
    render (){
        return(
            <>
            <Container className="home-trainers">
            <Row>
                <Col className="header-block">
                    <h1>Top Trainers</h1>
                    <p class="main-text">People are busy.
                    So, this UI Kit let’s you customize,
                    build and deploy your landing page,<br/>
                    so you can start selling your product
                    to potential customers.</p>
                </Col>
            </Row>
            <Row>
                <Col lg="3" md="6">
                    <a href="#"><img src={require("../img/static/toptrainers/SonyaAlcock.png")}
                    alt="trainer-photo" className="trainer-photo"/></a>
                    <p className="trainer-name">Sonya Alcock</p>
                    <p class="trainer-title">Self-Develop</p>
                </Col>
                <Col lg="3" md="6">
                    <a href="#"><img src={require("../img/static//toptrainers/GordonMason.png")}
                    alt="ico" className="trainer-photo"/></a>
                    <p className="trainer-name">Gordon Mason</p>
                    <p class="trainer-title">Cheef</p>
                </Col>
                <Col lg="3" md="6">
                    <a href="#"><img src={require("../img/static/toptrainers/AliyaWorkman.png")}
                    alt="ico" className="trainer-photo"/></a>
                    <p className="trainer-name">Aliya Workman</p>
                    <p class="trainer-title">Motivation</p>
                </Col>
                <Col lg="3" md="6">
                    <a href="#"><img src={require("../img/static/toptrainers/KyranWills.png")}
                    alt="ico" className="trainer-photo"/></a>
                    <p className="trainer-name">Kyran Wills</p>
                    <p class="trainer-title">Piano</p>
                </Col>

            </Row>

            </Container>
            </>
        )
    }
};

export default HomeTrainers;
