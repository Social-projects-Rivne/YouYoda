import React from 'react';

import { Container, Row, Col, Form, Input, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { toast } from 'react-toastify';

import {API} from '../api/axiosConf';
import Cours from './cours';
import '../api/pagination';


export default class SearchingCourses extends React.Component{
    constructor(props) {
      super(props);

      this.state = {
        numberofpages: 0,
        curentpage: 1,
        coursesList:[]
      };
    }


    changePages = async(index) => {
        await this.setState({curentpage:index})
        await this.getData()
    }

    getData = async() => {
        try {
          let response = await API.get('/courses/search', {
            params: {
                pagenumber:this.state.curentpage,
                coursename: 'cour',
                rate: 5,
                status: "Open",
                location: "",
                categories: 1,
                cost_gte: 0,
                cost_lte: 10000,
                sort_rate: "rate", 
                sort_duration: "duration",
                sort_start_date: "start_date",
                sort_cost: "cost"
            }
          })

          this.setState({
              numberofpages:response.data.num_of_pages,
              coursesList:response.data.data
          })
          toast.success("after" + this.state.curentpage)
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

  render(){
      const PAGES = []
      for(let i=1; i<=this.state.numberofpages; i++){
           PAGES.push(
               <a   href={`#!${i}`}
                    className="cdp_i"
                    key={i+1}
                    onClick={() => this.changePages(i)}
                >
               {i}</a>
           )
       }

    return (

        <Router>
          <>
            <Container>
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
                    <Col>
                        <div className="content_detail__pagination cdp" actpage="1">
                			<a href="#!-1"
                                className="cdp_i"
                                onClick={(e) => this.changePrevNext(-1)}
                            >Prev</a>
                                {PAGES}
                			<a href="#!+1"
                                className="cdp_i"
                                onClick={(e) => this.changePrevNext(1)}
                            >Next</a>
                		</div>

                    </Col>
                </Row>
            </Container>
          </>
      </Router>
      )
  }
};
