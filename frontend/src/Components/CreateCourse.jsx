import React from 'react';

import Calendar from '@lls/react-light-calendar'
import { Container, Row, Button, Col, Label, Input, Form} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import { Redirect, Link } from 'react-router-dom';
import StarRatingComponent from 'react-star-rating-component';
import { toast } from 'react-toastify';

import LocationSearchInput from '../api/cityselector'
import { API } from '../api/axiosConf';
import { CommentList, CommentForm } from './CommentList';
import { defaultPhoto, isAuthenticated } from '../utils';
import { HOSTNAME_PORT } from '../utils';
import CourseImage from './CourseImage';

export default class CreateCourse extends React.Component{
    constructor(props){
      super(props);
      this.state = {
          coursename: '',
          cost: '',
          location: '',
          start_date: '',
          description: '',
          members_limit: '',
          duration: '',
          category: '',
          cover_url: '/media/',
          categories: [],
          status: 'Open',
      };
    }
    updateField = async(event) => {
        let fieldName = event.target.name;
        let newState = {};
        newState[fieldName] = event.target.value;
        await this.setState(newState);
    }
    updateCategory = async(event) => {
        await this.setState({category: event.target.value});
    }
    updateStatus = async(event) => {
        await this.setState({status: event.target.value});
    }
    _onFocus = (e) => {
    e.currentTarget.type = "date";
    e.currentTarget.style.marginLeft = "70px"
    }
    updateLocation = (location) => {
        this.setState({location: location.split(',')[0]});
    };
    getCategories = async() => {
        try {
            let response = await API.get("categories/list")
        this.setState({
            categories: response.data,
            category:response.data[0].name
            })
        }
        catch (error) {
            toast.error(error.message)
        }

    }
    getOwnerName = async() => {
        try {
            let response = await API.get("user/profile/view")
        this.setState({
            owner_name: response.data.first_name + " " + response.data.last_name
            })
        }
        catch (error) {
            toast.error(error.message)
        }

    }
    componentWillMount = async() => {
        await this.getCategories();
        await this.getOwnerName();
    }
    updateAvatarUrl = async(url) => {
        await this.setState({course_img: this.state.cover_url + url});
    };
    saveFomm = () => {

    }
    render(){
        let courseImg = defaultPhoto("/media/geometry-1023846_1920.jpg", this.state.course_img);
        let courseDate = "2019-10-05 13:30:00.000000";
        // let newCourseDate = moment(courseDate).format('Do MM, h:mm a');
        let courseDuration = 468000000000;
        let newCourseDuration = moment.duration(courseDuration).days();
        let date = new Date(courseDate);
        let startDate = date.getTime()
        let endDate = new Date(startDate).setDate(date.getDate() + newCourseDuration)
        let statuscolor;
        if(this.state.status == "Open"){
            statuscolor = "#54DB63"
        } else if (this.state.status == "Closed") {
            statuscolor = "#FC5252"
        } else {
            statuscolor = "#ffce54"
        }
        return(
            <Form method="POST">
            <div className="home-event ">
                <div className='cd-header'>
                <div className="d-flex justify-content-between flex-wrap container">
                    <h1 className="course-det-header">
                    <Input
                        type="coursename"
                        name="coursename"
                        className="field-course-name"
                        required
                        onChange={(e) => this.updateField(e)}
                        placeholder="Enter course name"
                        value={this.state.coursename}
                    />
                    </h1>
                </div>
                </div>
                <div>
                  <CourseImage updateUrl={this.updateAvatarUrl}/>
                    <div style={{
                            minHeight: '510px',
                            backgroundImage: `url(${courseImg})`,
                            backgroundColor: '#000',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'cover',
                            minWidth:'98vw',
                            height: "94vh",
                            width: '100%'
                        }}
                        ></div>
                    <div className="cd-info-block">
                        <Container className="d-flex flex-wrap">
                        <div className="cd cd-trainer">
                            <i className="fas fa-user-tie" style={{marginTop:"8px"}}/>
                            <span className="main-text" style={{display:"block"}}>
                            <Link to="" style={{color:"#fff"}}>{this.state.owner_name}
                            </Link></span>
                        </div>
                        <div className="cd cd-cost">
                            <i class="fas fa-dollar-sign"></i>
                            <span className="main-text">
                            <Input
                                type="cost"
                                name="cost"
                                className="field-course-price"
                                required
                                onChange={(e) => this.updateField(e)}
                                placeholder="Set price"
                                value={this.state.cost}
                            />
                            </span>
                        </div>
                        <div className="cd cd-loc">
                            <i class="fas fa-map-marker-alt"></i>
                            <span className="main-text cd-loc">
                              <Input
                                    type="location"
                                    name="location"
                                    className="field-course-location"
                                    required
                                    onChange={(e) => this.updateField(e)}
                                    placeholder="Set location"
                                    value={this.state.location}
                              />
                          </span>
                        </div>
                        <div className="cd cd-date">
                            <i class="far fa-calendar-alt"></i>

                            <span className="main-text cd-date">
                              <Input
                                type="input"
                                name="start_date"
                                className="field-course-start-date"
                                required
                                onFocus = {this._onFocus}
                                onChange={(e) => this.updateField(e)}
                                placeholder="Set start date"
                                value={this.state.start_date}
                              />
                            </span>
                        </div>
                        </Container>
                    </div>
                </div>

            <Container>
            <Row>
                <Col md="6" xs="12" className="course-detail-first-col">
                    <h4 className="course-detail-h4">About:</h4>
                    <Input
                        type="textarea"
                        name="description"
                        className="course-about-area"
                        placeholder="Tell for followers what your course is about"
                        onChange={(e) => this.updateField(e)}
                        value={this.state.description}
                    />
                  <p className="main-text cd-limit">Limit of members</p>
                    <Input
                        type="number"
                        name="members_limit"
                        className="field-courselimit"
                        style={{marginTop:"-10px"}}
                        required
                        onChange={(e) => this.updateField(e)}
                        value={this.state.members_limit}
                    />
                    <p className="main-text">Duration: </p>
                    <Input
                        type="number"
                        name="duration"
                        className="field-courseduration"
                        required
                        placeholder="Set duration in hours"
                        onChange={(e) => this.updateField(e)}
                        value={this.state.duration}
                    />
                  <p className="main-text">Start date: </p>
                    <Input
                      type="date"
                      name="start_date"
                      required
                      className="field-courseduration"
                      onChange={(e) => this.updateField(e)}
                      placeholder="Set start date"
                      value={this.state.start_date}
                    />
                   <p className="main-text">Price: </p>
                      <Input
                          type="number"
                          name="cost"
                          required
                          className="field-courseduration"
                          onChange={(e) => this.updateField(e)}
                          placeholder="Set price"
                          value={this.state.cost}
                      />
                    <p className="main-text">Location: </p>
                    <LocationSearchInput
                        updateLocation={this.updateLocation}
                        city={this.state.location}
                        className="form-control"
                    />
                   <p className="main-text" style={{marginTop:"10px"}}>Category:</p>
                    <Input
                      type="select"
                      name="category"
                      className="select-categody">
                      {this.state.categories.map((item) => {
                        return <option onClick={(e) => this.updateCategory(e)}>{item.name}</option>;
                      })}
                    </Input>
                    <p className="main-text" style={{marginTop:"10px"}}>Status:</p>
                     <Input
                       type="select"
                       name="category"
                       className="select-categody">
                       <option onClick={(e) => this.updateStatus(e)}>Open</option>
                       <option onClick={(e) => this.updateStatus(e)}>Closed</option>
                       <option onClick={(e) => this.updateStatus(e)}>In Progress</option>
                       <option onClick={(e) => this.updateStatus(e)}>Scheduled</option>
                     </Input>
                     <Button color="secondary"
                             type="button"
                             size="lg"
                             className="save-btn"
                             block
                             onClick={() => this.saveForm()}>
                         Create Course
                     </Button>
                </Col>
                <Col md="6" xs="12" className="create-course-calendar" style={{maxHeight:'500px'}}>
                    <p className="main-text">Specify the days you want to take course</p>
                    <Calendar startDate={startDate} endDate={endDate} />
                </Col>
            </Row>
            </Container>
            </div>
          </Form>
        )
    }
};
