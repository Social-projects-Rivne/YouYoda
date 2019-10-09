import React from 'react';

import { Container, Row, Col } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { API } from '../api/axiosConf';

import SearchForm from '../Components/SearchForm';


export default class Footer extends React.Component{
  sendStatusOnline = async() => { 
      let timestamp =  moment().unix();
      await API.patch('last/seen', {last_seen:timestamp})
      console.log("Sending online status")
  }
    setIntervalSending = () => {
        if(localStorage.getItem('token')){
            this.sendStatusOnline()
            setInterval(()=>{
                this.sendStatusOnline()
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
