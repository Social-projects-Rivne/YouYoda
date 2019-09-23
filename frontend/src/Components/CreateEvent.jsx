import React from 'react';
import Button from "reactstrap/es/Button";
import {Container, Row, Col, FormGroup, Label, Input, Form, CustomInput} from "reactstrap";
import {toast} from 'react-toastify';
import {API} from '../api/axiosConf';
import LocationSearchInput from '../api/cityselector'
import FilterEventsSideBar from './FilterEventsSideBar'
import {ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import ImageUpload from "./ImageUploadComponent";
import {axiosGet} from "../api/axiosGet";
import moment, {unix} from "moment";
import Event from "./event";

// import ChangePassword from "./ChangePassword";
// import ImageUpload from './ImageUploadComponent'
// import Avatar from './Avatar'

class CreateEvent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            category: '',
            eventsData: [],
            categories: [],
            name: '',
            description: '',
            owner: '',
            date: '',
            location: '',
            cover_url: '',
            selectedEvent: '',
        };
    }

    toggle = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    };

    getEvent = async () => {
        try {
            const response = await API.get('user/profile/event_organize');
            toast.success('get your page');
            return response.data;
        } catch (error) {
            toast.error('You cannot view your profile. Contact administrator or support system.');
        }
    };

    postEvent = async (formData) => {
        try {
            const response = await API.patch('user/profile/event_organize', formData);
            toast.success('Changes saved');
        } catch (error) {
            toast.error('You cannot update your profile. Contact administrator or support system.');
        }
    };

    saveForm = async () => {
        try {
            let categoryId = this.state.categories.filter(category => category.name == this.state.activeCategory)[0][`id`];
            let date = moment(this.state.date).unix()
            let payLoad = {};
            payLoad.categories = categoryId;
            payLoad.name = this.state.name;
            payLoad.description = this.state.description;
            payLoad.location = this.state.location;
            payLoad.owner = this.state.owner;
            payLoad.date = date.toString();
            payLoad.cover_url = this.state.cover_url;
            await this.postEvent(payLoad)
        } catch (error) {
            toast.error('error, something wrong')
        }
    };

    updateField = (event) => {
        event.preventDefault();
        this.setState({
            name: event.target.value,
        });
    };

    upDescription = (event) => {
        this.setState({
            description: event.target.value,
        });
    };

    upCategories = (category) => {
        this.setState({
            activeCategory: category.target.value,
        });
    };

    selectEvent = (event) => {
        this.setState({
            eventIndex: 0,
        });
    };

    upDate = (event) => {
        event.preventDefault();
        this.setState({
            date: event.target.value
        });

    };

    // upTime = (event) => {
    //     event.preventDefault();
    //     this.setState({
    //         time: event.target.value
    //     });
    // };

    updateLocation = (location) => {
        this.setState({location: location.split(',')[0]});
    };

    updateEventImage = (url) => {
        this.setState({cover_url: url});
    };

    async componentDidMount() {
        let eventsData = await this.getEvent();
        // let userData = eventsData.filter(eventName => eventName.id == eventsData.categories)[0]
        let userData = eventsData.filter(eventName => eventName.id == eventsData.categories)[0]
        let path = '/categories/list'
        let listCategories = await axiosGet(path);
        let activeCategory = listCategories.filter(category => category.id == eventsData[0].categories)[0][`name`];
        let date = new Date(userData.date * 1000)
        let dateformat = moment(date).format("YYYY-MM-DDThh:mm:ss")
        this.setState({
            activeCategory: activeCategory,
            eventsData: eventsData,
            categories: listCategories,
            date: dateformat,
            cover_url: userData.cover_url,
            owner: userData.owner,
            location: userData.location,
            description: userData.description,
            name: userData.name
        });
    };

    renderCategories = (category) => {
        return (
            <option key={category.index}>
                <CustomInput type="checkbox" id={category.name} label={category.name} value={category.id}
                             onClick={(event) => this.handleClickCategories(event)}
                />
                {category.name}
            </option>
        )
    };

    render() {
        const {name, categories, description, date, time} = this.state;

        console.log('event name', this.selectedEvent)

        return (
            <Form method="POST" className="form-event">

                {/*<Col sm="10" xs="auto" md={{size: 8, offset: 3}}>*/}
                {/*    <Label>Choose events list</Label>*/}
                {/*    <Input type="select"*/}
                {/*           name="events"*/}
                {/*        // value={categories}*/}
                {/*        // onChange={(e) => this.selectEvent(e)}*/}
                {/*           onChange={(e) => this.setState({selectedEvent: e.target.value})}*/}
                {/*    >*/}
                {/*        {this.state.eventsData.map((event, index) => <option key={index}*/}
                {/*                                                             value={index}> {event.name} </option>)}*/}

                {/*    </Input>*/}

                {/*    <FormGroup className="">*/}
                {/*        <Row>*/}
                {/*            <Col sm="8" md="8">*/}
                {/*                <Label className="event-name">Event Name*</Label>*/}
                {/*                <Input*/}
                {/*                    type="textarea"*/}
                {/*                    name="name"*/}
                {/*                    className="field-box-event-name"*/}
                {/*                    required*/}
                {/*                    value={name}*/}
                {/*                    onChange={this.updateField}*/}
                {/*                />*/}
                {/*            </Col>*/}
                {/*            <Col sm="4" md="4" className="column-dropdown-button">*/}
                {/*                <Label>Choose event category</Label>*/}
                {/*                <Input type="select"*/}
                {/*                       name="categories"*/}
                {/*                       value={this.state.activeCategory}*/}
                {/*                       onChange={(e) => this.upCategories(e)}*/}
                {/*                >*/}
                {/*                    {this.state.categories.map((category, index) => <option key={index}*/}
                {/*                                                                            value={category.name}> {category.name} </option>)}*/}
                {/*                </Input>*/}

                {/*            </Col>*/}
                {/*        </Row>*/}
                {/*        <Row>*/}
                {/*            <Col>*/}
                {/*                <Label className="course-name">Event description*</Label>*/}
                {/*                <Input*/}
                {/*                    type="textarea"*/}
                {/*                    name="event-description"*/}
                {/*                    className="field-box-event-description"*/}
                {/*                    required*/}
                {/*                    onChange={(e) => this.upDescription(e)}*/}
                {/*                    value={description}*/}
                {/*                />*/}
                {/*            </Col>*/}
                {/*        </Row>*/}
                {/*        <Row>*/}
                {/*            <Col md="9">*/}
                {/*                <Label className="label-date-event">Date of event</Label>*/}
                {/*                <Input*/}
                {/*                    type="datetime-local"*/}
                {/*                    name="event_date"*/}
                {/*                    className="field-box-event-date"*/}
                {/*                    placeholder=""*/}
                {/*                    onChange={this.upDate}*/}
                {/*                    value={moment(date).format("YYYY-MM-DDThh:mm:ss")}*/}
                {/*                />*/}
                {/*            </Col>*/}
                {/*            /!*<Col md="3">*!/*/}
                {/*            /!*    <Label className="label-date-event">Time of event</Label>*!/*/}
                {/*            /!*    <Input*!/*/}
                {/*            /!*        type="time"*!/*/}
                {/*            /!*        name="event_time"*!/*/}
                {/*            /!*        className="field-box-event-date"*!/*/}
                {/*            /!*        placeholder=""*!/*/}
                {/*            /!*        onChange={this.upTime}*!/*/}
                {/*            /!*        // value={moment(time).format("HH:mm:ss")}*!/*/}
                {/*            /!*        value={time}*!/*/}
                {/*            /!*    />*!/*/}
                {/*            /!*</Col>*!/*/}
                {/*        </Row>*/}
                {/*        <Row>*/}
                {/*            <Col md="9">*/}
                {/*                <FormGroup className="location-formgroup-event ">*/}
                {/*                    <Label>Location</Label>*/}
                {/*                    <LocationSearchInput*/}
                {/*                        name="location-event"*/}
                {/*                        updateLocation={this.updateLocation}*/}
                {/*                        city={this.state.location}*/}
                {/*                        className="field-box"*/}
                {/*                    />*/}
                {/*                </FormGroup>*/}
                {/*            </Col>*/}
                {/*        </Row>*/}
                {/*        <Row>*/}
                {/*            <Col>*/}
                {/*                <ImageUpload updateUrl={this.updateEventImage}/>*/}
                {/*            </Col>*/}
                {/*        </Row>*/}
                {/*        <Row>*/}
                {/*            <Col md="4">*/}
                {/*                <Button color="secondary"*/}
                {/*                        type="button"*/}
                {/*                        size="lg"*/}
                {/*                        className="button-create-event"*/}
                {/*                        block*/}
                {/*                        onClick={() => this.saveForm()}>*/}
                {/*                    Create event*/}
                {/*                </Button>*/}
                {/*            </Col>*/}
                {/*        </Row>*/}
                {/*    </FormGroup>*/}
                {/*</Col>*/}
                <Event/>
            </Form>
        )
    }
}

export default CreateEvent;