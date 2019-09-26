import React from 'react';

import { Container,Row,Button,Col } from 'reactstrap';
import moment from 'moment';
import { Link } from 'react-router-dom';
import StarRatingComponent from 'react-star-rating-component';
import { toast } from 'react-toastify';
import DayPicker from 'react-day-picker';

import { API } from '../api/axiosConf';
import { CommentList, CommentForm } from './CommentList';
import { defaultPhoto, isAuthenticated } from '../utils';


export default class TrainerPage extends React.Component{
    constructor(props){
      super(props);
      this.state = {
          
      };
    }
    
    render(){
        
        return(

            <div className=" ">
                <div className='cd-header'>
                <div className="d-flex justify-content-between flex-wrap container">
                    <h1 className="course-det-header">
                        <Button
                            className='btn'
                            color="warning"
                            style={{margin:'0 15px 10px 0'}}
                            onClick={this.subscribeCourse}
                        >Join</Button>
                        {this.props.course.coursename}
                        <span className="course-detail-status" style={{color:statuscolor}}>
                            {this.props.course.status}
                        </span>
                    </h1>
                    <div className="main-text star d-flex">
                        <StarRatingComponent starCount={10} className="course-star-rating"
                                             value={this.props.course.rate} />
                        <div className="rate-num">
                            <span className="rate-big">{this.props.course.rate}/</span>
                            <span className="rate-small">10</span>
                        </div>
                    </div>
                </div>
                </div>
                <div >
                    <div style={{
                            minHeight: '510px',
                            backgroundImage: `url(${coverImg})`,
                            backgroundColor: '#000',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'cover',
                            minWidth:'98vw',
                            height: "94vh",
                            width: '100%'
                        }}
                         alt={this.props.course.coursename}></div>

                    
                </div>

            <Container>
                <Row>

                </Row>
            </Container>
            </div>

        )
    }
};
