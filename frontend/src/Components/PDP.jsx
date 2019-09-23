import React from 'react';

import { Container, Row, Button,Col, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import { Calendar, Views, momentLocalizer } from 'react-big-calendar'

import moment from 'moment';
import { Link, Redirect } from 'react-router-dom';
import StarRatingComponent from 'react-star-rating-component';
import { toast } from 'react-toastify';
import DayPicker from 'react-day-picker';

import { API } from '../api/axiosConf';
import { defaultPhoto, isAuthenticated } from '../utils';
import PdpTooltip from './PdpTooltip';
import ToolTip from 'react-portal-tooltip'
import { axiosGet } from '../api/axiosGet';
import { FormErrors } from '../api/FormError';

const localizer = momentLocalizer(moment)

const propTypes = {}


export default class PDP extends React.Component{
    constructor(props) {
    super(props)

    this.state = {
      tooltipToggle: false,
      redirect: false,
      modal: false,
      event: {id:''},
      tooltip: {x: 0, y:0},
      mainEventsList: [],
      yodaEventList: [],
      yodaCourseList: [],
      userEventList: [],
      title: '',
      ownEventDesc: '',
      start:'',
      end:'',
      cover_url: '',
      formErrors: {image: ''},
      imageValid: false,
      formValid: false,
      img: ''
    }
  }

  onSelectEvents = (event ,e) => {
    let tooltip = {x:e.clientX, y:e.clientY-40}
    this.setState({
      event,
      tooltip,
      tooltipToggle: true
    })
  }

  hideTooltip = () => {
    this.setState({
      tooltipToggle: false
    })
  }
  async componentWillMount() {
      let listCourses = await axiosGet('courses/top')
      let listEvents = await axiosGet('events/top')
      await this.setState({
          yodaCourseList: listCourses.map(
              item => {
                  item.title = item.coursename;
                  item.start = moment.unix(item.start_date).toDate()
                  item.end = moment.unix(item.start_date).add(
                      moment.duration(item.duration).hours(), 'hours').toDate()
                  item.type = '#FFD466'
                  item.display = 'inline'
                return item
              }
          ),
          yodaEventList: listEvents.map(
              item => {
                  item.title = item.name;
                  item.start = moment.unix(item.date).toDate()
                  item.end = moment.unix(item.date).add(5, 'hours').toDate()
                  item.type = '#80c5f6'
                  item.display = 'inline'
                      return item
                  }
              ),

      })
      this.setState({
          mainEventsList: [
              ...this.state.yodaEventList,
              ...this.state.yodaCourseList,
              ...this.state.userEventList
          ]
      })
  }

  handleSelect = ({ start, end }) => {
      this.toggle()
      this.setState({
          start: start,
          end: end
      })
  }


  handleSubmit = () => {
    if (this.state.imageValid){
      this.setState({
        mainEventsList: [
            ...this.state.mainEventsList,
            {
                start: this.state.start,
                end: this.state.end,
                title: this.state.title,
                ownEventDesc: this.state.ownEventDesc,
                cover_url: this.state.cover_url,
                type: '#800080',
                display: 'none'
            },
        ],
      })
    }
    this.toggle()
    }
  customEventStyle = (event) => {
      return {style:{background: event.type}}
  }

  eventInformation = () => {
     this.setState({ redirect: true });
  };

  toggle = () => {
   this.setState(prevState => ({
     modal: !prevState.modal
   }));
 }

 handleCreateNote = (e) => {
     let name = e.target.name;
     let value = e.target.value;
     this.setState({[name]: value});
 }
 handleUploadImage = (e) => {
     e.preventDefault();
     let image = e.target.files[0];
     let reader = new FileReader();
     reader.onloadend = () => {
         this.setState({
             img: image,
             imagePreviewUrl: reader.result,
         }, () => { this.validateImage(image)}
        );
     };
     let url = reader.readAsDataURL(image);
     this.setState({cover_url: url});
 };

 validateImage(image) {
       let fieldValidationErrors = this.state.formErrors;
       let {imageValid, img} = this.state;
       let imageSize = image.size / 1024 / 1024;

       imageValid = imageSize < 1
       fieldValidationErrors.image = imageValid ? '': 'Your cover image must be less then 1MB';

       this.setState({formErrors: fieldValidationErrors,
                     imageValid: imageValid,
                     }, this.validateForm);
 }

 validateForm() {
   this.setState({formValid: this.state.imageValid});
 }


  render() {
    let tooltip = this.state.tooltip
    let defImg = "/media/event.png";
    let coverImg = defaultPhoto(defImg, this.state.event.cover_url);
    let start = moment.unix(this.state.event.start).format("H:mm a")
    let end = moment.unix(this.state.event.end).format("H:mm a")
    let { redirect } = this.state;
    if (redirect) {
       if( this.state.event.coursename ){
            return <Redirect to={{
                        pathname: '/course/detail',
                        state: {course: this.state.event}}}
                    />;
        } else {
            return <Redirect to={{
                        pathname: '/event/detail',
                        state: {event: this.state.event}}}
                    />;
        }
    }

    return (
      <div className="pdp">
        <Calendar
            popup
            selectable
            localizer = {localizer}
            events = {this.state.mainEventsList}
            views={['month', 'week', 'day']}
            eventPropGetter = {(event) => this.customEventStyle(event)}
            defaultView = {Views.MONTH}
            scrollToTime = {new Date(1970, 1, 1, 6)}
            defaultDate = {new Date()}
            onSelectEvent = {(event, e) => this.onSelectEvents(event, e)}
            onSelectSlot = {this.handleSelect}
        />
        <div
            id="tooltip-calendar"
            style={{position:'absolute', top:tooltip.y, left:tooltip.x}}
        >
        <ToolTip
            active={this.state.tooltipToggle}
            position="bottom"
            parent="#tooltip-calendar"
        >
                    <div
                        onMouseLeave={this.hideTooltip}
                        className="pdp-tooltip"
                        style={{backgroundImage:`url(${coverImg})`}}
                    >
                        <p>
                            {this.state.event.title}
                            <button
                                className="btn btn-warning"
                                style={{display:this.state.event.display}}
                                onClick={() => this.eventInformation()}
                            >Information</button>

                        </p>
                        <div>
                            <button
                                className="btn btn-danger"
                                style={{display:this.state.event.display}}
                            >Unsubscribe</button>
                            <button
                                className="btn btn-danger"
                                style={{display: this.state.event.display === 'none' ? 'inline' : 'none' }}
                            >Delete</button>
                            <span>
                                <i className="far fa-clock"></i>{start} - {end}
                            </span>
                        </div>

                    </div>
                </ToolTip>

        </div>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
              <ModalHeader toggle={this.toggle}>Create new note</ModalHeader>
              <ModalBody className="pdp-form">
                <form>
                    <div className="form-group">
                        <label for="pdp-own-event-title">Title of new note:</label>
                        <input className="form-control"
                                id="pdp-own-event-title"
                                placeholder="Title"
                                name="title"
                                value={this.state.title}
                                onChange = {this.handleCreateNote}
    							required
                        />
                    </div>
                    <div className="form-group">
                        <label for="pdp-own-event-desc">Short description:</label>
                        <textarea className="form-control"
                                id="pdp-own-event-desc"
                                rows="3"
                                name="ownEventDesc"
                                value={this.state.ownEventDesc}
                                onChange = {this.handleCreateNote}
                        ></textarea>
                    </div>
                    <div className="form-error">
                         <FormErrors formErrors={this.state.formErrors} />
                    </div>
                    <div className="upload-btn-wrapper">
                        <button className="upload-btn" id="pdp-own-event-img" >Upload a image</button>
                        <input type="file"
                                name="image"
                                accept="image/*"
                                onChange = {this.handleUploadImage}
                        />
                    </div>
                </form>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={this.handleSubmit}>Create</Button>{' '}
                <Button color="secondary" onClick={this.toggle}>Cancel</Button>
              </ModalFooter>
        </Modal>
      </div>
    )
  }
};
PDP.propTypes = propTypes
