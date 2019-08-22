import React from 'react';

import {Container, Button, Row, Col} from 'reactstrap';


export default class HomeLastBlock extends React.Component{
    render (){
        return(
            <>
            <Container className="home-last-block">
            <Row>
                <Col sm="7" className="header-block">
                    <h1>So, How about it?</h1>
                    <p class="main-text">People are busy.
                    So, this UI Kit let’s you customize,
                    build and deploy your landing page,
                    so you can start selling your product
                    to potential customers.</p>
                    <div className="btn-group-sign">
                        <Button color="warning" className="btn-sign"
                                style={{marginRight:'33px'}}
                                onClick={this.props.handleClickReg}>
                            Sign Up
                        </Button>
                        <Button color="secondary" className="btn-sign"  onClick={this.props.handleClickLogin}>
                            Sign In
                        </Button>
                    </div>
                </Col>
                <Col md="5" sm="1">
                    <img src={require("../img/static/last-block-photo.png")}
                    alt="foto-event" />
                </Col>
            </Row>


            </Container>
            </>
        )
    }
};
