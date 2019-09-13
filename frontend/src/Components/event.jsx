import React from 'react';

import { Container, Row, Col, Card, CardTitle, CardText, CardHeader, CardFooter, CardBody } from 'reactstrap';
import ClipLoader from 'react-spinners/ClipLoader';
import { css } from '@emotion/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import { Redirect, Link } from 'react-router-dom'

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
          redirect: false
      }
  }
  componentWillMount(){
      this.setState({loading: true})
  }

  componentDidMount(){
      this.setState({loading: false})
  }

  handleClick = async (event) => {
        await this.setState({ event });
        await this.setState({ redirect: true });
        window.location.reload();
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
                          <Link onClick={() => this.handleClick(event)}>{event.name}</Link>
                      </CardTitle>
                      <CardText>
                          <p><span className="main-text-span">Category: </span>{event.categories}</p>
                          <p>Rate: {event.rate}</p>
                          <p><span className="main-text-span">Event organizer: </span>{event.owner}</p>
                          <p><FontAwesomeIcon icon={['fas', 'map-marker-alt']}/>{' '}{event.location}</p>
                      </CardText>
                  </CardBody>
                  <CardFooter className="card-event-footer">
                      <img src={coverimg} alt={event.name}/>
                  </CardFooter>
              </Card>
          </Col>
     )
  }

    render(){
        const { redirect } = this.state
        if (redirect) {
           return <Redirect to={{pathname: '/event/detail', state: {event: this.state.event}}}/>;
        }
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
            </Container>
        )
    }
}
