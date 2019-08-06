import React from 'react';

import {Container, Row, Col, Form, Input, Button} from 'reactstrap';
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {Link} from 'react-router-dom';


export default class Footer extends React.Component{
  render(){
    return (
      <>
      <footer className="footer">
        <section>
          <Container>
            <Row>
              <Col md="5">
                <ul className="footer-nav">
                    <li>
                        <Link to={"/about"} activeClassName="active">About</Link>
                    </li>
                    <li>
                        <Link to={"/courses"} activeClassName="active">Courses</Link>
                    </li>
                    <li>
                        <Link to={"/trainers"} activeClassName="active">Trainers</Link>
                    </li>
                    <li>
                        <Link to={"/events"} activeClassName="active">Events</Link>
                    </li>
                </ul>
                <Form action="#" className="form">
                    <Input type="search" id="text" className="search-input"
                            placeholder="Search..."/>
                    <Button className="search-button">
                        <FontAwesomeIcon icon="search"/>
                    </Button>
                </Form>
              </Col>
              <Col>
                  <ul className="soc">
                   <li className="facebook">
                      <a href="#">
                        <FontAwesomeIcon icon={['fab', 'facebook']}/>
                      </a>
                    </li>
                    <li className="twitter">
                      <a href="#">
                        <FontAwesomeIcon icon={['fab', 'twitter']}/>
                      </a>
                    </li>
                    <li className="instagram">
                      <a href="#">
                        <FontAwesomeIcon icon={['fab', 'instagram']}/>
                      </a>
                    </li>
                    <li className="whatsapp">
                      <a href="#">
                        <FontAwesomeIcon icon={['fab', 'whatsapp']}/>
                      </a>
                    </li>
                  </ul>
                  <span>© YouYoda 2019 All rights reserved</span>
              </Col>
            </Row>
          </Container>
        </section>
        </footer>
      </>
      )
  }
};
