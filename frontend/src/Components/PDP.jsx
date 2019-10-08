import React from 'react';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Calendar, Views, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import ToolTip from 'react-portal-tooltip';

import { API } from '../api/axiosConf';
import { axiosGet } from '../api/axiosGet';
import { defaultPhoto } from '../utils';
import { FormErrors } from '../api/FormError';
import { getUserSubscribeData } from '../api/getUserSubscribeData';


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
      img: '',
      isSubscribed: false,
      cover_url: '',
      formErrors: {image: ''},
      imageValid: true,
      formValid: false,
    }
  }

  onSelectEvents = (event, e) => {
    var itemID = '';
    var itemType = '';
    let tooltip = {x:e.clientX, y:e.clientY-40};
    this.setState({
      event,
      tooltip,
      tooltipToggle: true
    });

    if(event.course) {
      itemID = event.course.id;
      itemType = 'course';
    } else if(event.event) {
      itemID = event.event.id;
      itemType = 'event';
    }
    if(itemID && itemType) {
      getUserSubscribeData(itemType, itemID).then(isUserSubscribed => {
        this.setState({
          isSubscribed: isUserSubscribed
        });
      });
    }
  }

  hideTooltip = () => {
    this.setState({
      tooltipToggle: false,
      isSubscribed: false
    });
  }

  async componentWillMount() {
    try{
        let listCourses = await axiosGet('user/course/add')
        let listEvents = await axiosGet('user/event/add')
        let listNote = await axiosGet('user/pdp')
        await this.setState({
            yodaCourseList: listCourses.map(
                  item => {
                  item.title = item.course.coursename;
                  item.cover_url = item.course.cover_url;
                  item.start = moment.unix(item.date).toDate()
                  item.end = moment.unix(item.date).add(
                      moment.duration(item.course.duration).hours(), 'hours').toDate()
                  item.type = '#FFD466'
                  item.display = 'inline'
                return item
              }
            ),
            yodaEventList: listEvents.map(
                item => {
                    item.title = item.event.name;
                    item.cover_url = item.event.cover_url;
                    item.start = moment.unix(item.event.date).toDate()
                    item.end = moment.unix(item.event.date).add(4, 'hours').toDate()
                    item.type = '#80c5f6'
                    item.display = 'inline'
                        return item
                }
            ),
            userEventList: listNote.map(
                item => {
                    item.title = item.title;
                    item.start = moment.unix(item.start).toDate()
                    item.end = moment.unix(item.end).toDate()
                    item.type = '#800080'
                    item.display = 'none'
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
    } catch (error) {
        toast.error(error.message + ' Please, сontact the administration for more information');
    }
  }
  handleDeleteNote = async() => {
      try {
          await API.delete('user/pdp', {
              data:this.state.event
          })
          let list = this.state.mainEventsList
          for( let i = 0; i < list.length; i++){ 
            if ( list[i] == this.state.event) {
                list.splice(i, 1); 
              i--;
            }
         }
      } catch (error) {
          toast.error(error.message + ' Please, try later');
      }
  }

  handleSelect = ({ start, end }) => {
      this.toggle()
      this.setState({
          start: start,
          end: end
      })
  }

  uploadCoverImg = async() => {
    if (this.state.img){
        if(this.state.imageValid) {
            let data = new FormData();
            try {
                data.append('file', this.state.img);
                let cover_img_url = await API.post('user/profile/change_avatar', data)
                    this.setState({cover_url:cover_img_url.data.avatar_url})
            } catch(error) {
                toast.error(error.message + ' Please, try later');
            }
        }
    }
  }

  handleSubmit = async() => {
    if (this.state.title){
        await this.uploadCoverImg()
        let noteAdd = {
            title: this.state.title,
            ownEventDesc: this.state.ownEventDesc,
            start: moment(this.state.start).unix(),
            end: moment(this.state.end).unix(),
            cover_url: this.state.cover_url,
            status:'New'
        }
        try {
            let response = await API.post('user/pdp', noteAdd)
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
                            display: 'none',
                            id: response.data.id
                        }
                    ], 
                })
            toast.success('Success');
        } catch (error) {
            toast.error(error.message + ' Please, try later');
        }
      this.toggle()
    }
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
         }, () => { this.validateImage(image)}
        );
     };
     let url = reader.readAsDataURL(image);
     this.setState({cover_url: url});
 };

 validateImage = (image) => {
       let fieldValidationErrors = this.state.formErrors;
       let {imageValid} = this.state;
       let imageSize = image.size / 1024 / 1024;

       imageValid = imageSize < 1
       fieldValidationErrors.image = imageValid ? '': 'Your cover image must be less then 1MB';

       this.setState({formErrors: fieldValidationErrors,
                     imageValid: imageValid,
                     }, this.validateForm);
 }

 validateForm = () => {
   this.setState({formValid: this.state.imageValid});
 }

  unsubscribeClickCourse = async(courseData, typeItem) => {
    let unsubscribeURL = '';
    let paramItem = {};
    let itemName = '';
    if(typeItem === 'course') {
        unsubscribeURL = 'user/course/delete';
        paramItem = {'course': courseData.id};
        itemName = courseData.coursename;
    }
    else if(typeItem === 'event') {
        unsubscribeURL = 'user/event/delete';
        paramItem = {'event': courseData.id};
        itemName = courseData.name;
    }
    if(!unsubscribeURL || !paramItem)
        return;

    const USERDATA = {"params": paramItem};
    try {
        const response = await API.delete(unsubscribeURL, USERDATA);
        if(response.status === 204) {
            toast.success(`You unsubscribed from ${typeItem} "${itemName}"`);
            // update list of pdp items without request to backend
            let list = this.state.mainEventsList;
            for(let i = 0; i < list.length; i++) {
                if(typeItem === 'course' && list[i].course) {
                    if (list[i].course.id == courseData.id) {
                        list.splice(i, 1); 
                        i--;
                    }
                } else if(typeItem === 'event' && list[i].event) {
                    if (list[i].event.id == courseData.id) {
                        list.splice(i, 1); 
                        i--;
                    }
                }
            }
        }
    } catch (error) {
        toast.error(error.message);
    }
  }

  render() {
    let tooltip = this.state.tooltip;
    let defImg = "/media/event.png";
    let coverImg = defaultPhoto(defImg, this.state.event.cover_url);
    let start = moment.unix(this.state.event.start).format("H:mm a");
    let end = moment.unix(this.state.event.end).format("H:mm a");
    let { redirect } = this.state;
    if (redirect) {
       if( this.state.event.name ){
            return <Redirect to={{
                        pathname: '/event/detail',
                        state: {event: this.state.event.event}}}
                    />;
        } else {
            return <Redirect to={{
                        pathname: '/course/detail',
                        state: {course: this.state.event.course}}}
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
            style={{position:'fixed', top:tooltip.y, left:tooltip.x}}
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
                                style={{display:this.state.event.display, color:'#fff'}}
                                onClick={() => this.eventInformation()}
                            >Information</button>
                        </p>
                        <div>
                            {(this.state.isSubscribed !== 'completed' && this.state.isSubscribed) ? (
                                (this.state.event.course) ? (
                                    <button
                                        className="btn btn-danger"
                                        style={{display:this.state.event.display, color:'#fff'}}
                                        onClick={() => this.unsubscribeClickCourse(this.state.event.course, 'course')}
                                    >Unsubscribe</button>
                                ) : ((this.state.event.event) ? (
                                    <button
                                        className="btn btn-danger"
                                        style={{display:this.state.event.display, color:'#fff'}}
                                        onClick={() => this.unsubscribeClickCourse(this.state.event.event, 'event')}
                                    >Unsubscribe</button>
                                    ) : ''
                                )
                            ) : ''}
                            {(this.state.isSubscribed === 'completed') ? (
                                <span style={{color:'#54DB63'}} title="This event has been finished">
                                    <i className="fas fa-flag-checkered"></i>&nbsp;
                                </span>
                            ) : ''}
                            <button
                                className="btn btn-danger"
                                style={{display: this.state.event.display === 'none' ? 'inline' : 'none', color:'#fff'}}
                                onClick={() => this.handleDeleteNote()}
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
                        <label htmlFor="pdp-own-event-title">Title of new note <span style={{color:'red'}}>*</span> :</label>
                        <input
                                className="form-control"
                                id="pdp-own-event-title"
                                name="title"
                                value={this.state.title}
                                onChange = {this.handleCreateNote}
                                required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="pdp-own-event-desc">Short description:</label>
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
                <Button color="warning" onClick={this.handleSubmit} disabled={!this.state.imageValid}>Create</Button>{' '}
                <Button color="secondary" onClick={this.toggle}>Cancel</Button>
              </ModalFooter>
        </Modal>
      </div>
    )
  }
};
PDP.propTypes = propTypes
