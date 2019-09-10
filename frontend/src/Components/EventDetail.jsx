import React from 'react';

import { Container, Row, Button, Col } from 'reactstrap';
import moment from 'moment';
import { Redirect, Link } from 'react-router-dom';

import { API } from '../api/axiosConf';
import { defaultPhoto, isAuthenticated } from '../utils';

export default class EventDetail extends React.Component{
    constructor(props){
      super(props);
    }
    
    render(){
        let defimg = "/media/beautiful-crowd-cute-2869374.jpg";
        let coverimg = defaultPhoto(defimg, this.props.event.cover_url);
        let eventDate = this.props.event.date;
        let newEventDate = moment(eventDate).format('MMMM Do YYYY, h:mm:ss a');
        
        return(
            <div >
            <Container className="home-event">
            <Row>
                <Col className="d-flex justify-content-between">
                    <h1 className="course-det-header">
                        {this.props.event.name}
                    </h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <img style={{maxWidth: "100%", height: "auto", width: '100%'}} src={coverimg} alt={this.props.event.name} />
                    <h4 className="course-detail-h4">About:</h4>
                    <p className="main-text">{this.props.event.description}</p>
                </Col>
            </Row>
            <Row>
                <Col md="6" xs="12" className="course-detail-first-col">
                    <p className="main-text"><span className="main-text-span">Category: </span><Link to="" style={{color:"#000"}}>{this.props.event.categories}</Link></p>
                    <p className="main-text">Owner: <Link to="" style={{color:"#000"}}>{this.props.event.owner}</Link></p>
                    <p className="main-text"><span className="main-text-span">Start: </span> {newEventDate}</p>
                    <p className="main-text">Location: {this.props.event.location}</p>
                </Col>
            </Row>
            <Row>
                <Col xs="12" className="btn-group-course-detail d-flex justify-content-between">
                    <Button
                        className={`btn-sign ${isAuthenticated("show")}`}
                        color="warning"
                        style={{marginRight:'33px'}}
                    >Join</Button>
                    <Link to="/"><Button color="secondary" className="btn-sign">Cancel</Button></Link>
                </Col>
            </Row>
            </Container>
            </div>
        )
    }
};
