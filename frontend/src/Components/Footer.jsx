import React from 'react';

import { Container, Row, Col, Form, Input, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { API } from '../api/axiosConf';


export default class Footer extends React.Component{
  sendStatusOnline = async(timenow) => { 
      let timestamp =  moment(timenow).unix();
      await API.patch('last/seen', {last_seen:timestamp})
      console.log("Sending online status" + timestamp)
  }
    setIntervalSending = () => {
        if(localStorage.getItem('token')){
            let timenow = new Date()
            this.sendStatusOnline(timenow)
            setInterval(()=>{
                let timenow = new Date()
                this.sendStatusOnline(timenow)
            }, 1000*60)
        }
    }
    componentDidMount () {
        this.setIntervalSending()
    }
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
                    <Link to="/courses" >
                        Courses
                    </Link>
                  </li>
                  <li>
                    <Link to="/trainers" >
                        Trainers
                    </Link>
                  </li>
                  <li>
                    <Link to="/events" >
                        Events
                    </Link>
                  </li>
                </ul>
                <Form action="#" className="form">
                    <Input type="search" id="search-input"
                            placeholder="Search..."/>
                    <Button id="search-button">
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
