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
import Cours from './cours';
import { axiosGet } from '../api/axiosGet';
import Event from './event';
import Certificate from './Certificate';





export default class TrainerPage extends React.Component{
    constructor(props){
      super(props);
      this.state = {
          cover_url: "",
          coursesList: [],
          eventsList: [],
          certificateList: [],
          loading: true,
          trainer: {}
      };
    }
    async componentWillMount() {
        try{
            let response = await API.get('trainer/page', {
                params:{
                    "id":4
                }
            })
            this.setState({
                trainer: response.data.trainer,
                coursesList: response.data.courses,
                eventsList: response.data.events,
                certificateList: response.data.certificates,
                loading: false
            })
            
        } catch (error) {
            toast.error(error.message + ' Please, сontact the administration for more information');
        }
      }
      lastLogin = () => {
        let today = new Date();
        let mins = moment(today).diff(this.state.trainer.last_login, "minute")
        let d = 0;
        let h = 0;
        let m = 0;
        if(mins >= 60*24){
            d = mins / (60*24);
            return moment.utc().days(d).format("D");
        } else if(mins >= 60){
            h = mins / 60;
            return moment.utc().hours(h).format("H");
        } else {
            return moment.utc().minutes(mins).format("M");
        }

       
    }
    

    render(){
        let defImg = "/media/aircraft-2795557_1920.jpg";
        let coverImg = defaultPhoto(defImg, this.state.cover_url);
        let today = new Date();
        let birthDay = moment(this.state.trainer.birth_date).format('Do MMMM YYYY');
        let lastLogin = moment(today).diff(this.state.trainer.last_login, "minute")

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
                        <h1>{`${this.state.trainer.first_name} ${this.state.trainer.last_name}`}</h1>
                        <div className="status-offline col">
                            <ul>
                            <li>Last Login</li>
                            <li>
                                <i className="far fa-clock"></i>
                                {lastLogin} hours ago
                            </li>
                            </ul>

                        </div>
                        <div className="funny-icon">
                            <i className="fas fa-business-time"><span> 2 Years with YouYoda</span></i>
                            <i className="fas fa-hand-spock"><span> {this.state.coursesList.length} Created Courses</span></i>
                            <i className="fas fa-glass-cheers"><span> {this.state.eventsList.length} Organized Events</span></i>

                        </div>
                    </Row>
                    <Row className="trainer-general-information">
                        <h2>General Information:</h2>
                        <ul>
                            <li>
                                <i className="fas fa-globe-africa"></i>
                                <span> {this.state.trainer.location}</span>
                            </li>
                            <li>
                                <i className="fas fa-birthday-cake"></i>
                                <span> {birthDay}</span>
                            </li>
                            <li>
                                <i className="fas fa-phone-alt"></i>
                                <span> {this.state.trainer.phone_number} </span>
                            </li>
                        </ul>
                        <div>
                            <h4><i className="far fa-address-card"></i> About me:</h4>
                            <p>One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin. He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections.

    The bedding was hardly able to cover it and seemed ready to slide off any moment. His many legs, pitifully thin compared with the size of the rest of him, waved about helplessly as he looked. "What's happened to me? " he thought. It wasn't a dream.

    His room, a proper human room although a little too small, lay peacefully between its four familiar walls. A collection of textile samples lay spread out on the table - Samsa was a travelling salesman - and above it there hung a picture that he had recently cut out of an illustrated magazine and housed in a nice, gilded frame. It showed a lady fitted out with a fur hat and fur boa who sat upright, raising a heavy fur muff that covered the whole of her lower arm towards the viewer. Gregor then turned to look out the window at the dull weather. Drops </p>
                        </div>
                    </Row>
                    <Row className="trainer-courses-list">
                        <h2>Courses:</h2>
                        <Cours coursesList = {this.state.coursesList} loading = {this.state.loading}/>
                    </Row>
                    <Row className="trainer-events-list">
                        <h2>Events:</h2>
                        <Event eventList = {this.state.eventsList} loading = {this.state.loading}/>
                    </Row>
                    <Row className="trainer-certificates-list">
                        <h2>Certificates:</h2>
                        <Certificate certificateList = {this.state.certificateList} loading = {this.state.loading}/>
                    </Row>
                </Container>




            </div>

        )
    }
};
