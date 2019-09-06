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
          let response = await API.post('/courses/search', {
                coursename__icontains: '',
                rate__lte: '',
                rate__gte: '',
                status__in: '',
                location__icontains: '',
                categories__in: '',
                cost__gt: '',
                cost: '',
                order_by: 'rate'
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
          </>
      </Router>
      )
  }
};