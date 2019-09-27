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
          cover_url: ""
      };
    }

    render(){
        let defImg = "/media/aircraft-2795557_1920.jpg";
        let coverImg = defaultPhoto(defImg, this.state.cover_url);
        return(

            <div className="trainer-page">
                <div style={{
                        backgroundImage: `url(${coverImg})`,
                        backgroundColor: '#000',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        minWidth:'98vw',
                        height: "40vh",
                        width: '100%'
                    }}
                ></div>
                <Container>
                    <Row className="d-flex trainer-page-header">
                        <div className="trainer-avatar">
                            <img src={coverImg} alt="trainer avatar"/>
                        </div>
                        <h1>Name + lastname</h1>
                        <div className="status-offline col">
                            <ul>
                            <li>Offline</li>
                            <li>
                                <i className="far fa-clock"></i>
                                10 hours ago
                            </li>
                            </ul>

                        </div>
                        <div className="funny-icon">
                            <i class="fas fa-business-time"><span> 2 Years with YouYoda</span></i>
                            <i class="fas fa-hand-spock"><span> 4 Created Courses</span></i>
                            <i class="fas fa-glass-cheers"><span> 3 Organized Events</span></i>
                            <i class="fas fa-hanukiah"><span></span></i>

                        </div>
                    </Row>
                </Container>




            </div>

        )
    }
};
