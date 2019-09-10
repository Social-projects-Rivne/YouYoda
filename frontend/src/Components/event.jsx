import React from 'react';

import { Container, Row, Col, Card, CardTitle, CardText, CardHeader, CardFooter, CardBody, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import ClipLoader from 'react-spinners/ClipLoader';
import { css } from '@emotion/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import { Link } from 'react-router-dom'

import { isAuthenticated, defaultPhoto } from '../utils';
import '../api/pagination';
import { defaultPhoto } from '../utils';


const override = css`
    display: block;
    margin: 0 auto;
    border-color: #FFD466;
`;

export default class Event extends React.Component{
    constructor(props) {
      super(props);

      this.state = {
          loading: true,
          modal: false,
      }
  }

  toggle = async (event) => {
        await this.setState(prevState => ({
            modal: !prevState.modal,
            event
        }));
        console.log(event);
    }

  componentWillMount(){
      this.setState({loading: true})
  }

  componentDidMount(){
      this.setState({loading: false})
  }

  renderEvents(event) {
      const eventDate = event.date;
      const newEventDate = moment(eventDate).format('MMMM Do YYYY, h:mm:ss a');
      let defimg = "/media/beautiful-crowd-cute-2869374.jpg";
      let coverimg = defaultPhoto(defimg, event.cover_url);
      return (
          <Col sm="12" md="6" lg="4" xl="3">
              <Card className="event-card">
                  <CardHeader className="event-header">{newEventDate}</CardHeader>
                  <CardBody className="event-body">
                      <CardTitle className="event-card-header">
                      <Link onClick={() => this.toggle(event)}>{this.props.buttonLabel}{event.name}</Link>
                      </CardTitle>
                      <CardText>
                          <p><span className="main-text-span">Category: </span>{event.categories}</p>
                          <p>Rate: {event.rate}</p>
                          <p><span className="main-text-span">Event organizer: </span>{event.owner}</p>
                          <p><FontAwesomeIcon icon={['fas', 'map-marker-alt']}/>{' '}{event.location}</p> 
                      </CardText>
                  </CardBody>
                  <CardFooter>
                      <img width="100%" src={coverimg} alt={event.name} className="event-cover-photo"/>
                  </CardFooter>
              </Card>
          </Col>
     )
  }

    render(){
        const event = this.state.event || this.props.eventList[0];
        console.log(event);
        const closeBtn = <button className="close" onClick={this.toggle}>&times;</button>;
        const eventDate = event.date;
        const newEventDate = moment(eventDate).format('MMMM Do YYYY, h:mm:ss a');
        let defimg = "/media/beautiful-crowd-cute-2869374.jpg";
        let coverimg = defaultPhoto(defimg, event.cover_url);

        return (
            <Container>
                <div className='sweet-loading'>
                    <ClipLoader
                      css={override}
                      sizeUnit={"px"}
                      size={150}
                      color={'#123abc'}
                      loading={this.props.loading}
                />
                </div>
                <Row>
                    {this.props.eventList.map( event => this.renderEvents(event) )}
                </Row>
                 <Modal isOpen={this.state.modal} className={this.props.className}>
                                <ModalHeader toggle={this.toggle} close={closeBtn}><h4 className="secondary-header">{event.name}</h4>
                                    <p className="main-category">Category: {event.categories}</p>
                                    <p className="main-text-event-modal">{event.description}</p></ModalHeader>
                                <ModalBody>
                                    <img src={coverimg} alt={event.name} className="event-modal-photo"/>
                                    <p className="main-text">{event.location}</p>
                                    <p className="main-text">{newEventDate}</p>
                                    <p className="main-text">Event organizer: {event.owner}</p>
                                </ModalBody>
                                <ModalFooter>
                                    <Button className={`btn-join ${isAuthenticated("show")}`} color="warning" onClick={this.toggle}>Join</Button>{' '}
                                    <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                                </ModalFooter>
                            </Modal>  
            </Container>
        )
    }
}
