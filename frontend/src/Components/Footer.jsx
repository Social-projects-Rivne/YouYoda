import React from 'react';

import { Container, Row, Col } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

import SearchForm from '../Components/SearchForm';


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
                    <Link to="/about" >
                        About
                    </Link>
                  </li>
                  <li>
                    <Link to="/courses/search" >
                        Courses
                    </Link>
                  </li>
                  <li>
                    <Link to="/trainers" >
                        Trainers
                    </Link>
                  </li>
                  <li>
                    <Link to="/events/search" >
                        Events
                    </Link>
                  </li>
                </ul>
                <SearchForm />
              </Col>
              <Col>
                  <ul className="soc">
                   <li className="facebook">
                      <a href="/">
                        <FontAwesomeIcon icon={['fab', 'facebook']}/>
                      </a>
                    </li>
                    <li className="twitter">
                      <a href="/">
                        <FontAwesomeIcon icon={['fab', 'twitter']}/>
                      </a>
                    </li>
                    <li className="instagram">
                      <a href="/">
                        <FontAwesomeIcon icon={['fab', 'instagram']}/>
                      </a>
                    </li>
                    <li className="whatsapp">
                      <a href="/">
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
