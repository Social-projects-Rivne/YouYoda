import React from 'react';
import moment from 'moment';

import { axiosGet } from '../api/axiosGet';
import { Container, Row, Col, InputGroup, InputGroupText, InputGroupAddon, Input, Button, Card, CardTitle, CardText, CardHeader, CardFooter, CardBody } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export default class EventsList extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            eventsList: [],
        };    
    }

    async componentWillMount() {
        let path = 'events/top'
        let listEvents = await axiosGet(path);
        this.setState({
                eventsList: listEvents,
                });
    }

    renderEvents(event) {
        if(!event.cover_url)
            event.cover_url = require("../img/static/event.png");
        const eventDate = event.date;
        const newEventDate = moment(eventDate).format('MMMM Do YYYY, h:mm:ss a');
        return (
       
           <Col xs="12" sm="6" md="3">
        <Card className="event-card">
        <div className="event-header">
        <CardHeader>
          <Row>
          <Col>{newEventDate}</Col>
          </Row>
        </CardHeader>
        </div>
        <div className="event-body">
        <CardBody>
          <CardTitle className="event-card-header">{event.name}</CardTitle>
          <CardText>
          <p>Category:{'  '}{event.categories}</p>
          <div>
          <Row>
          <Col md="1">
          <FontAwesomeIcon icon={['fas', 'map-marker-alt']}/>
          </Col>
          <Col md="6"><p>{event.location}</p></Col></Row>
          </div>
          </CardText>
        </CardBody>
        </div>
         <CardFooter>
         <img width="100%" src={event.cover_url} alt={event.name}/>
         </CardFooter>
      </Card>
      </Col>
    
        )
    }


    render(){
        return(
        	<div>
        	  <Container>
             <div className="search-input-group">
        	    <Row>
        	      <Col xs="12" md={{ size: 7, offset: 1 }}>
        	       <InputGroup className="search-input">
                     <InputGroupAddon addonType="prepend">
                       <InputGroupText>
                       <FontAwesomeIcon icon="search"/>
                       </InputGroupText>
                     </InputGroupAddon>
                     <Input placeholder="Search by trainer, events, tag" />
                       <InputGroupAddon addonType="append">
                         <Input type="select" name="select" id="exampleSelect">
                           <option value="" selected>Category</option>
                           <option>1</option>
                           <option>2</option>
                           <option>3</option>
                           <option>4</option>
                           <option>5</option>
                         </Input>
                       </InputGroupAddon>              
                     </InputGroup>
                     </Col>
                     <Col xs="8" md="4">
                     <Button color="warning" className="btn-search-events">
                     <span className="btn-search-events-title">SEARCH</span>
                     </Button>  
                 </Col>
        	     </Row>	
               </div>
        	   

              <Row>
              <Col>
              <h1 className="title-events">Events</h1>
              </Col>
              </Row>
                  
               <Row>
      {this.state.eventsList.map( event => this.renderEvents(event) )}
      
    </Row> 

   

        	  </Container>
        	</div>       
        	);
    }
}