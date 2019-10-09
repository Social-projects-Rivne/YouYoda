import React from 'react';

import { Container, Row, Button, Col, Input, Form, FormGroup} from 'reactstrap';
import { Redirect, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import moment from "moment";

import { API } from '../api/axiosConf';
import { defaultPhoto } from '../utils';
import CourseImage from './CourseImage';
import LocationSearchInput from '../api/cityselector'


export default class CreateCourse extends React.Component{
    constructor(props){
      super(props);
      this.state = {
          selectedDays: [],
          coursename: '',
          cost: '',
          location: '',
          start_date: '',
          start_time: '',
          description: '',
          members_limit: '',
          duration: '',
          category: '',
          is_public: true,
          cover_url: '/media/',
          categories: [],
          status: 'Open',
          redirect: false,
          validSchedule: true,
      };
    }

    handleDayClick = (day, { selected }) => {
      const { selectedDays } = this.state;
       if (selected) {
         const selectedIndex = selectedDays.findIndex(selectedDay =>
           DateUtils.isSameDay(selectedDay, day)
         );
         selectedDays.splice(selectedIndex, 1);
       } else {
         selectedDays.push(day);
       }
       this.setState({ selectedDays });
       let start_date = moment(Math.min.apply(null, selectedDays));
       let chosen = moment(this.state.start_date);
       let isAfter = moment(chosen).isAfter(start_date);
       if (isAfter)
         this.setState({ validSchedule: false });
       else
         this.setState({ validSchedule: true });
    }

    updateField = async(event) => {
        let fieldName = event.target.name;
        let newState = {};
        newState[fieldName] = event.target.value;
        await this.setState(newState);
    }

    updateCategory = async(category) => {
        await this.setState({category: category.id});
    }

    updateStatus = async(event) => {
        await this.setState({status: event.target.value});
    }

    updateLocation = (location) => {
        this.setState({location: location.split(',')[0]});
    };

    getCategories = async() => {
        try {
            let response = await API.get("categories/list")
        this.setState({
            categories: response.data,
            category:response.data[0].id
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
            owner_name: `${response.data.first_name} ${response.data.last_name}`
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

    saveForm = async () => {
        const data = new FormData();
        let payLoad = {};

        if (this.state.coursename &&
           this.state.cost &&
           this.state.location &&
           this.state.start_date &&
           this.state.description &&
           this.state.members_limit &&
           this.state.duration &&
           this.state.category &&
           this.state.status &&
           this.state.start_time &&
           this.state.validSchedule)
        {
        if ([this.state.cost, this.state.members_limit, this.state.duration].every(el => el > -1))
        {
        if (this.state.course_img)
        {
          let formatedDays = [];
          for (let index = 0; index < this.state.selectedDays.length; index++)
          {

            let date = new Date(this.state.selectedDays[index]);
            let selected_day = date.getTime();
            formatedDays.push(selected_day / 1000);
          }

          let day = new Date(this.state.start_date);
          day.setHours(this.state.start_time.substring(0,2));
          day.setMinutes(this.state.start_time.substring(3,5));
          let start_day = day.getTime()

          await this.setState({start_date: start_day / 1000});

          payLoad.coursename = this.state.coursename;
          payLoad.cost = this.state.cost;
          payLoad.location = this.state.location;
          payLoad.start_date = this.state.start_date;
          payLoad.description = this.state.description;
          payLoad.members_limit = this.state.members_limit;
          payLoad.duration = this.state.duration;
          payLoad.categories = this.state.category;
          payLoad.status = this.state.status;
          payLoad.is_public = this.state.is_public;
          payLoad.cover_url = this.state.course_img;
          payLoad.course_schedule = formatedDays;

          try {
              data.append('file', this.state.file);
              await this.postCourse(payLoad);
              await this.setState({redirect: true});
              } catch (error) {
                  toast.error('You can not create course. Please contact support');
              }
        }
        else
          toast.error('You didnt choose image for course')
        }
        else
          toast.error('Fields duration, member limits and price can not be negative or string');;
        }
        else
          toast.error('You didnt enter all information about course. Please fill in the fields.');
    };

    postCourse = async (formData) => {
        try {
            await API.post('trainer/create-course', formData);
        } catch (error) {
            toast.error('You cannot create course. Contact administrator or support system.');
        }
    };

    render(){
        let courseImg = defaultPhoto("/media/geometry-1023846_1920.jpg", this.state.course_img);
        if (this.state.redirect) {
            return <Redirect to='/courses/search' />
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
                            <i className="fas fa-user-tie"/>
                            <span className="main-text" style={{color:"#fff"}}>
                              {this.state.owner_name}
                            </span>
                        </div>
                        <div className="cd cd-cost">
                            <i class="fas fa-dollar-sign"></i>
                            <span className="main-text">
                            {this.state.cost}
                            </span>
                        </div>
                        <div className="cd cd-loc">
                            <i class="fas fa-map-marker-alt"></i>
                            <span className="main-text cd-loc">
                            {this.state.location}
                          </span>
                        </div>
                        <div className="cd cd-date">
                            <i class="far fa-calendar-alt"></i>

                            <span className="main-text cd-date">
                            {this.state.start_date}
                            </span>
                        </div>
                        </Container>
                    </div>
                </div>

            <Container>
            <Row>
                <Col md="6" xs="12" className="course-detail-first-col">
                    <h4 className="course-detail-h4">About<span className="required-fields"> *</span></h4>
                    <span className="required-fields"> *</span><span> - required fields</span>
                    <Input
                        type="textarea"
                        name="description"
                        className="course-about-area"
                        placeholder="Tell for followers what your course is about"
                        onChange={(e) => this.updateField(e)}
                        value={this.state.description}
                    />
                  <p className="main-text cd-limit">Limit of members<span className="required-fields"> *</span></p>
                    <Input
                        type="number"
                        name="members_limit"
                        className="field-courselimit"
                        style={{marginTop:"-10px"}}
                        required
                        onChange={(e) => this.updateField(e)}
                        value={this.state.members_limit}
                    />
                    <p className="main-text">Duration<span className="required-fields"> *</span></p>
                    <Input
                        type="number"
                        name="duration"
                        className="field-courseduration"
                        required
                        placeholder="Set duration in hours"
                        onChange={(e) => this.updateField(e)}
                        value={this.state.duration}
                    />
                  <p className="main-text">Start date<span className="required-fields"> *</span></p>
                    <Input
                      type="date"
                      name="start_date"
                      className="field-courseduration"
                      onChange={(e) => this.updateField(e)}
                      placeholder="Set start date"
                      value={this.state.start_date}
                    />
                  <p className="main-text">Start time<span className="required-fields"> *</span></p>
                      <Input
                        type="time"
                        name="start_time"
                        required
                        className="field-courseduration"
                        onChange={(e) => this.updateField(e)}
                        placeholder="Set start time"
                        value={this.state.start_time}
                      />
                   <p className="main-text">Price<span className="required-fields"> *</span></p>
                      <Input
                          type="number"
                          name="cost"
                          className="field-courseduration"
                          onChange={(e) => this.updateField(e)}
                          placeholder="Set price"
                          value={this.state.cost}
                      />
                    <p className="main-text">Location<span className="required-fields"> *</span></p>
                    <FormGroup className="city-country-2">
                      <LocationSearchInput
                          updateLocation={this.updateLocation}
                          city={this.state.location}
                      />
                    </FormGroup>
                   <p className="main-text" style={{marginTop:"10px"}}>Category<span className="required-fields"> *</span></p>
                    <Input
                      type="select"
                      name="category"
                      className="select-categody">
                      {this.state.categories.map((item) => {
                        return <option onClick={(e) => this.updateCategory(item)}>{item.name}</option>;
                      })}
                    </Input>
                    <p className="main-text" style={{marginTop:"10px"}}>Status<span className="required-fields"> *</span></p>
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
                <Col md="6" xs="12" className="course-detail-second-col" style={{display:"block"}}>
                    <p className="main-text daypicker-title">Specify the days you want to take course<span className="required-fields"> *</span></p>
                      {!this.state.validSchedule && <span className="valid-schedule">
                              schedule cannot start earlier start date
                        </span>}
                      <DayPicker
                        className="daypicker"
                        selectedDays={this.state.selectedDays}
                        onDayClick={this.handleDayClick}
                      />
                </Col>
            </Row>
            </Container>
            </div>
          </Form>
        )
    }
};
