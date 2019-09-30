import React from 'react';

import { BrowserRouter as Router, Route} from "react-router-dom";
import { Container, Row, Col, Input, InputGroup, InputGroupText, InputGroupAddon } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast } from 'react-toastify';

import { API } from '../api/axiosConf';
import Cours from './cours';


export default class TrainerCourses extends React.Component{
    constructor(props) {
      super(props);

      this.state = {
          coursesList:[],
          loading: true
      };
    }

    getData = async() => {
       try {
         let response = await API.get('/trainer/courses')
         console.log(response);
         this.setState({
             coursesList:response.data,
             loading: false
         })
       }
       catch (error) {
         toast.error(error.message)
       }
   }

    async componentDidMount () {
        await this.getData();
    }

    render(){
    return (
        <div id="SearchingCourses" style={{minHeight:"80vh"}}>
            <Container>
                <Row>
                    <Col>
                        <h1 className="title-events">Own courses</h1>
                    </Col>
                </Row>
                <Cours coursesList={this.state.coursesList} loading={this.state.loading} lg={4}/>                  
            </Container>
        </div>
     )
    }
  };
