import React from 'react';

import { BrowserRouter as Router, Route} from "react-router-dom";
import { Container, Row, Col, Input, InputGroup, InputGroupText, InputGroupAddon } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast } from 'react-toastify';

import { API } from '../api/axiosConf';
import Cours from './cours';
import FilterCoursesSideBar from './FilterCoursesSideBar';


export default class SearchingCourses extends React.Component{
    constructor(props) {
      super(props);

      this.state = {
          numberofpages: 2,
          curentpage: 1,
          coursesList:[],
          order_by: 'rate',
          rate__lte: '',
          rate__gte: '',
          cost__gt: '',
          cost: '',
          status__in: '',
          categories__in: '',
          coursename__icontains: '',
          loading: true
      };
    }

    changePages = async(index) => {
        await this.setState({curentpage:index})
        await this.getData()
    }

    getData = async() => {
       try {
         let response = await API.post('/courses/search', {
               coursename__icontains: this.state.coursename__icontains,
               location__icontains: '',
               rate__lte: this.state.rate__lte,
               rate__gte: this.state.rate__gte,
               status__in: this.state.status__in,
               categories__in: this.state.categories__in,
               cost__gt: this.state.cost__gt,
               cost: this.state.cost,
               order_by: this.state.order_by
         },
         {
             params: {
                 page:this.state.curentpage,
             }
         }
     )
         this.setState({
             numberofpages:response.data.num_of_pages,
             coursesList:response.data.data,
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

    changePrevNext = async(param) => {
        await this.setState({curentpage:(this.state.curentpage+param)});
        await this.getData();
    }

    handleCategoriesList = async (value) => {
        await this.setState({
            categories__in: value,
            curentpage: 1});
        await this.getData();
      }

    handleStatusList = async (value) => {
        await this.setState({
            status__in: value,
            curentpage: 1});
        await this.getData();
      }

    handleFreeData = async (value) => {
        await this.setState({
            cost: value,
            curentpage: 1});
        await this.getData();
      }

    handlePaidData = async (value) => {
        await this.setState({
            cost__gt: value,
            curentpage: 1});
        await this.getData();
      }

    handleRateGteData = async (value) => {
        await this.setState({
            rate__gte: value,
            curentpage: 1});
        await this.getData();
      }

    handleRateLteData = async (value) => {
        await this.setState({
            rate__lte: value,
            curentpage: 1});
        await this.getData();
      }

    handleSortData = async (e) => {
        let value = e.target.value
        await this.setState({
            order_by: value,
            curentpage: 1})
            console.log(this.state.order_by)
        await this.getData();
      }

    handleSearchData = async (event) => {
        const value = event.target.value;
        await this.setState({
            coursename__icontains: value,
            curentpage: 1});
        await this.getData();
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

    return (
          <div id="SearchingCourses" style={{minHeight:"80vh"}}>
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
                          <div id="wrap">
                              <form action="" autoComplete="on">
                                  <input id="search"
                                         name="search"
                                         type="text"
                                         placeholder="What're you looking for?"
                                         onChange = {(event) => {this.handleSearchData(event)}}
                                  />
                                  <input id="search_submit"
                                         value="Rechercher"
                                         type="submit"
                                  />
                              </form>
                          </div>
                          <Row>
                              <Col>
                                  <h1 className="title-events">Courses</h1>
                              </Col>
                          </Row>
                          <Row className="search-input-group">
                              <Col className="d-flex justify-content-end">
                                  <InputGroup className="search-input" style={{width:'300px'}}>
                                       <InputGroupAddon addonType="prepend">
                                          <InputGroupText className="search-input-icon">
                                              <FontAwesomeIcon icon="sort-amount-up"/>
                                          </InputGroupText>
                                      </InputGroupAddon>
                                      <InputGroupAddon addonType="append" className="search-input-select">
                                          <Input type="select" name="select" id="search-input-select" onChange={(e) => this.handleSortData(e)}>
                                              <option value="" selected disabled>Sort by</option>
                                              <option value="duration" >Duration</option>
                                              <option value="start_date" >Start date</option>
                                              <option value="cost" >Cost</option>
                                              <option value="rate" >Rate</option>
                                          </Input>
                                      </InputGroupAddon>
                                  </InputGroup>
                              </Col>
                          </Row>
                          <Route
                              path='/courses/search:page'
                              render={() => <Cours coursesList={this.state.coursesList} loading={this.state.loading} lg={3}/>}
                          />
                          <Route
                              exact
                              path='/courses/search'
                              render={() => <Cours coursesList={this.state.coursesList} loading={this.state.loading} lg={3}/>}
                          />
                          <Row>
                              <Col style={{visibility:visibpag}}>
                                  <div className="content_detail__pagination cdp" actpage={this.state.curentpage}>
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
