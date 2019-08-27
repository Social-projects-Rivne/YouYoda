import React from 'react';

import { Container, Row, Col, InputGroup, InputGroupText, InputGroupAddon, Input, Button, Card, CardTitle, CardText, CardHeader, CardFooter, CardBody, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export default class EventsList extends React.Component{
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
                         <InputGroupText> 
                         <FontAwesomeIcon icon={['fas', 'map-marker-alt']}/>
                         </InputGroupText>
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
      <Col xs="12" sm="6" md="4">
        <Card className="event-card">
        <div className="event-header">
        <CardHeader>
          <Row>
          <Col>1 September</Col>
          <Col style={{textAlign: "right"}}>18:00</Col>
          </Row>
        </CardHeader>
        </div>
        <div className="event-body">
        <CardBody>
          <CardTitle>Solo concert of Oleh Vynyk</CardTitle>
          <CardText>
          <p>$ 2</p>
          <div>
          <Row>
          <Col md="1">
          <FontAwesomeIcon icon={['fas', 'map-marker-alt']}/>
          </Col>
          <Col md="6"><p>Rivne, Stadium Avangard</p></Col></Row>
          </div>
          </CardText>
         

        </CardBody>
        </div>
         <CardFooter>
         <img width="100%" src={require('../img/static/event.png')} alt="Card image event" />
         </CardFooter>
      </Card>
      </Col>
     
      

    </Row> 

    <div className="pagination"> 
    <Pagination size="lg" aria-label="Page navigation example">
      <PaginationItem disabled>
          <PaginationLink first href="#" />
        </PaginationItem>
        <PaginationItem disabled>
          <PaginationLink previous href="#" />
        </PaginationItem>
        <PaginationItem active>
          <PaginationLink href="#">
            1
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">
            3
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">
            4
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">
            5
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink next href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink last href="#" />
        </PaginationItem>
      </Pagination>
      </div>

        	  </Container>
        	</div>       
        	);
    }
}