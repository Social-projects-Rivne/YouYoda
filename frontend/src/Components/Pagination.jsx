import React from 'react';

import { Container, Row, Col, Form, Input, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';


import API from '../api/axiosConf';
import '../api/pagination';

export default class Footer extends React.Component{
    constructor(props) {
      super(props);

      this.state = {
        numberofpages: 1
      };
    }
    async componentDidMount() {
      try {
        const response = await API.get('/courses/pagination')
            this.setState({numberofpages:response.data})
      }
      catch (error) {
        toast.error(error.message)
      }
    };


  render(){
      const PAGES = []
      for(let i=1; i<=10; i++){
           PAGES.push(<a href={`#!${i}`} className="cdp_i" key={i+1}>{i}</a>)
      }
    return (
      <>
        <Container>
            <Row>
                <Col>
                    <div className="content_detail__pagination cdp" actpage="1">
            			<a href="#!-1" className="cdp_i">Prev</a>
                        {PAGES}
            			<a href="#!+1" className="cdp_i">Next</a>
            		</div>

                </Col>
            </Row>
        </Container>
      </>
      )
  }
};
