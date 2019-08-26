import React from 'react';

import { Container, Row, Col, InputGroup, InputGroupText, InputGroupAddon, Input, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export default class EventsList extends React.Component{
    render(){
        return(
        	<div>
        	  <Container>
        	   <br />
        	    <Row>
        	      <Col xs="12" md="8">
        	       <InputGroup>
                     <InputGroupAddon addonType="prepend">
                       <InputGroupText>
                       <FontAwesomeIcon icon="search"/>
                       </InputGroupText>
                     </InputGroupAddon>
                     <Input placeholder="Search by trainer, events, tag" />
                       <InputGroupAddon addonType="append">
                         <InputGroupText> <a href="#"></a>
                         <FontAwesomeIcon icon={['fas', 'map-marker-alt']}/>
                         </InputGroupText>
                         <Input type="select" name="select" id="exampleSelect">
                           <option value="" selected>Category</option>
                           <option>1</option>
                           <option>2</option>
                           <option>3</option>
                           <option>4</option>
                           <option>5</option>
                         </Input>
                       </InputGroupAddon>
                       <Button color="warning" className="btn-search-events">Search</Button>                   
                     </InputGroup>
                   </Col>
        	     </Row>	
        	    <br />
        	  </Container>
        	</div>       
        	);
    }
}