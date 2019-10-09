import React from 'react';

import {Card, CardText, CardTitle, Container, Col, CardHeader, CardFooter, CardBody, Row} from 'reactstrap';
import {css} from '@emotion/core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import moment from 'moment';
import {Redirect, Link} from 'react-router-dom'

import {API} from "../api/axiosConf";
import {defaultPhoto} from '../utils';
import {toast} from "react-toastify";


const override = css`
    display: block;
    margin: 0 auto;
    border-color: #FFD466;
`;

export default class OwnEvent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            redirect: false,
            eventsData: [],
        }
    }

    componentWillMount() {
        this.setState({loading: true})
    }

    getEvent = async () => {
        try {
            const response = await API.get('user/profile/event_organize');
            this.setState({
                eventData: response.data
            })
        } catch (error) {
            toast.error('You cannot view your profile. Contact administrator or support system.');
        }
    };

    componentDidMount() {
        this.setState({loading: false})
    }

    handleClick = (event) => {
         this.setState({
            event,
            redirect: true
        });
    }

    renderEvents(event) {
        const eventDate = event.date;
        const newEventDate = moment.unix(eventDate).format('MMMM Do YYYY, h:mm:ss a');
        let defImg = "/media/beautiful-crowd-cute-2869374.jpg";
        let coverImg = defaultPhoto(defImg, event.cover_url);
        return (
            <Col sm="12" md="6" lg="4" xl={this.props.lg}>
                <Link className="card-link card-event-whole " onClick={() => this.handleClick(event)}>
                    <Card className="event-card card-event">
                        <CardHeader className="event-header">{newEventDate}</CardHeader>
                        <CardBody className="event-body event-body-2">
                            <CardTitle className="event-card-header">
                                <Link>{event.name}</Link>
                            </CardTitle>
                            <CardText>
                                <p><span className="main-text-span">Category: </span>{event.categories}</p>
                                <p className="text-span-description-event">
                                    <span className="main-text-span">Description: </span>{event.description}
                                </p>
                                <p><FontAwesomeIcon icon={['fas', 'map-marker-alt']}/>{' '}{event.location}</p>
                            </CardText>
                        </CardBody>
                        <CardFooter className="card-own-event">
                            <img width="100%" height="100%" src={coverImg} alt={event.name}/>
                        </CardFooter>
                    </Card>
                </Link>
            </Col>
        )
    }

    render() {
        const {redirect} = this.state
        if (redirect) {
            return <Redirect to={{pathname: '/eventedit', state: {event: this.state.event}}}/>;
        }
        return (
            <Container>
                <Row>
                    {this.props.eventsData.map(event => this.renderEvents(event))}
                </Row>
            </Container>
        )
    }
}
