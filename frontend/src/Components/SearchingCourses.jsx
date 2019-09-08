import React from 'react';

import { Container, Row, Col, Form, Input, Button, InputGroup, InputGroupText, InputGroupAddon } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import FilterCoursesSideBar from './FilterCoursesSideBar';
import { toast } from 'react-toastify';

import { API } from '../api/axiosConf';
import Cours from './cours';
import '../api/pagination';


export default class SearchingCourses extends React.Component{
    constructor(props) {
      super(props);

      this.state = {
        numberofpages: 0,
        curentpage: 1,
        coursesList:[],
        orderBy: '',
        rate__lte: '',       
        rate__gte: '',
        cost__gt: '',
        cost: '',
        status__in: '',
        categories__in: '',
      };
    }

    changePages = async(index) => {
        await this.setState({curentpage:index})
        await this.getData()
    }

    getData = async() => {
       try {
         let response = await API.post('/courses/search', {
               coursename__icontains: '',
               location__icontains: '',
               rate__lte: this.state.rate__lte,
               rate__gte: this.state.rate__gte,
               status__in: this.state.status__in,
               categories__in: this.state.categories__in,
               cost__gt: this.state.cost__gt,
               cost: this.state.cost,
               order_by: this.state.orderBy
         },
         {
             params: {
                 page:this.state.curentpage,
             }
         }
     )
         this.setState({
             numberofpages:response.data.num_of_pages,
             coursesList:response.data.data
         })
       }
       catch (error) {
         toast.error(error.message)
       }
   }

    async componentDidMount () {
        await this.getData()
    }

    changePrevNext = async(param) => {
        await this.setState({curentpage:(this.state.curentpage+param)})
        await this.getData()
    }

    handleCategoriesList = (value) => {
        this.setState({categories__in: value});
      }

    handleStatusList = (value) => {
        this.setState({status__in: value}); 
      } 

    handleFreeData = (value) => {
        this.setState({cost: value});
      }

    handlePaidData = (value) => {
        this.setState({cost__gt: value});
      }

    handleRateGteData = (value) => {
        this.setState({rate__gte: value});
      } 

    handleRateLteData = (value) => {
        this.setState({rate__lte: value});
      }   

    render(){
        let pages = []
        for(let i=1; i<=this.state.numberofpages; i++){
             pages.push(
                 <a   href={`#!${i}`}
                      className="cdp_i"
                      key={i+1}
                      onClick={() => this.changePages(i)}
                  >
                 {i}</a>
             )
         }
         let visibpag = 'visible';
         if (this.state.numberofpages < 2) {
             visibpag = 'hidden'
         }
        console.log(this.state);
    return (
          <div id="SearchingCourses">
              <FilterCoursesSideBar sendCategoriesData={this.handleCategoriesList}
                                    sendStatusData={this.handleStatusList}
                                    sendCostPaidData={this.handlePaidData}
                                    sendCostFreeData={this.handleFreeData}
                                    sendRateGteData={this.handleRateGteData}
                                    sendRateLteData={this.handleRateLteData}
              />
              <div id="page-wrap">
                  <Router>
                      <Container>
                          <Row>
                              <Col>
                                  <h1 className="title-events">Courses</h1>
                              </Col>
                          </Row>
                          <Row className="search-input-group">
                              <Col>
                                  <InputGroup className="search-input">
                                      <InputGroupAddon addonType="prepend">
                                          <InputGroupText className="search-input-icon">
                                             {/*<FontAwesomeIcon icon="search"/>*/}
                                              <FontAwesomeIcon icon="sort"/>
                                          </InputGroupText>
                                      </InputGroupAddon>
                                          {/*<Input placeholder="Search by trainer, events, tag" />*/}
                                      <InputGroupAddon addonType="append" className="search-input-select">
                                          <Input type="select" name="select" id="search-input-select">
                                              <option value="" selected>Sort by</option>
                                              <option onClick={() => this.setState({ orderBy: 'duration' })}>Duration</option>
                                              <option onClick={() => this.setState({ orderBy: 'start_date'})}>Start date</option>
                                              <option onClick={() => this.setState({ orderBy: 'cost'})}>Cost</option>
                                              <option onClick={() => this.setState({ orderBy: 'rate'})}>Rate</option>
                                          </Input>
                                      </InputGroupAddon>              
                                  </InputGroup>
                              </Col>
                          </Row> 
                          <Route
                              path='/courses/search:page'
                              render={() => <Cours coursesList={this.state.coursesList}/>}
                          />
                          <Route
                              exact
                              path='/courses/search'
                              render={() => <Cours coursesList={this.state.coursesList}/>}
                          />
                          <Row>
                              <Col style={{visibility:visibpag}}>
                                  <div className="content_detail__pagination cdp" actpage="1">
                                      <a href="#!-1"
                                          className="cdp_i"
                                          onClick={(e) => this.changePrevNext(-1)}
                                          >Prev</a>
                                          {pages}
                                      <a href="#!+1"
                                          className="cdp_i"
                                          onClick={(e) => this.changePrevNext(1)}
                                          >Next</a>
                                  </div>
                              </Col>
                          </Row>
                      </Container>  
                  </Router>
              </div>
          </div>
     )
    }
  };


        