import React from 'react';

import Button from "reactstrap/es/Button";
import {Row, Col, FormGroup, Label, Input, Form, CustomInput} from "reactstrap";
import {toast} from 'react-toastify';
import moment from "moment";

import {API} from '../api/axiosConf';
import {axiosGet} from "../api/axiosGet";
import {defaultPhoto} from "../utils";
import ImageUpload from "./ImageUploadComponent";
import LocationSearchInput from '../api/cityselector'
import {Link} from "react-router-dom";

export default class YourEvents extends React.Component {
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
            date: new Date(),
            location: '',
            cover_url: '',
            selectedEvent: '',
            id: '',
            validDate: true,
        };
    }

    toggle = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    };

    patchEvent = async (formData) => {
        if (this.state.validDate ) {
            try {
                await API.patch('user/profile/event_organize', formData);
                toast.success('Changes saved');
            } catch (error) {
                toast.error('You cannot update your profile. ' + '\b Please fill all fields');
            }
        } else {
            toast.error("Date is invalid")
        }
    };
    postEvent = async (formData) => {
        if (this.state.validDate) {
            try {
                await API.post('user/profile/event_organize', formData);
                toast.success('Changes saved');
            } catch (error) {
                toast.error('You cannot update your profile. ' + '\b Please fill all fields');
            }
        } else {
            toast.error("Date is invalid")
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
            if (this.state.id) {
                payLoad.id = this.state.id;
                await this.patchEvent(payLoad)
            } else {
                await this.postEvent(payLoad)
            }
        } catch (error) {
            toast.error("Can't save changes. Fill all fields")
        }
    };

    updateField = (event) => {
        event.preventDefault();
        this.setState({
            name: event.target.value,
        });
    };

    updateDescription = (event) => {
        this.setState({
            description: event.target.value,
        });
    };

    updateCategories = (category) => {
        this.setState({
            activeCategory: category.target.value,
        });
    };

    updateDate = (event) => {
        event.preventDefault();
        let now = moment();
        let chosen = moment(event.target.value);
        let isAfter = moment(chosen).isAfter(now);
        this.setState({
            date: event.target.value,
            validDate: isAfter
        });
    };

    updateLocation = (location) => {
        this.setState({location: location.split(',')[0]});
    };

    updateEventImage = (url) => {
        this.setState({cover_url: url});
    };

    async componentDidMount() {
        let path = '/categories/list';
        let listCategories = await axiosGet(path);
        let defaultDate = '2020-09-20 14:12:12';
        try {
            let eventsData = this.props.event;
            let date = moment.unix(eventsData.date).format("YYYY-MM-DDTHH:mm:ss");
            this.setState({
                activeCategory: eventsData.categories,
                eventsData: eventsData,
                categories: listCategories,
                date: date,
                cover_url: eventsData.cover_url,
                location: eventsData.location,
                description: eventsData.description,
                name: eventsData.name,
                id: eventsData.id
            });
        } catch (e) {
            toast.error(e);
            this.setState({
                categories: listCategories,
                date: defaultDate,
            });
        }
    };

    renderCategories = (category) => {
        return (
            <option key={category.index}>
                <CustomInput type="checkbox"
                             id={category.name}
                             label={category.name} value={category.id}
                             onClick={(event) => this.handleClickCategories(event)}/>
                {category.name}
            </option>
        )
    };

    render() {
        let default_avatar_path = "/media/beautiful-crowd-cute-2869374.jpg";
        let alt_avatar = defaultPhoto(default_avatar_path, this.state.cover_url);
        let {name, description, date} = this.state;
        return (
            <Form method="POST" className="form-event" style={{paddingBottom: "100px"}}>
                <Col sm="10" xs="auto" md={{size: 7, offset: 3}}>
                    <FormGroup className="">
                        <Row>
                            <Col sm="10" md="10">
                                <Label className="event-name">Event Name*</Label>
                                {!this.state.name && <span className="text-validate-date">
                                       can't be empty
                                </span>}
                                <Input
                                    type="text"
                                    name="name"
                                    maxLength="60"
                                    className="field-box-event-name"
                                    required
                                    placeholder="Your event's name"
                                    value={name}
                                    onChange={this.updateField}
                                />
                            </Col>
                            <Col sm="4" md="4" className="column-dropdown-button">
                                <Label>Choose event category</Label>
                                {!this.state.activeCategory && <span className="text-validate-date">
                                       can't be empty
                                </span>}
                                <Input type="select"
                                       className="event-category"
                                       name="categories"
                                       value={this.state.activeCategory}
                                       onChange={(e) => this.updateCategories(e)}
                                       required>
                                    <option></option>
                                    {this.state.categories.map((category, index) =>
                                        <option key={index} value={category.name}> {category.name} </option>)}
                                </Input>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="10">
                                <Label className="course-name">Event description*</Label>
                                {!this.state.description && <span className="text-validate-date">
                                      can't be empty
                                </span>}
                                <Input
                                    type="textarea"
                                    name="event-description"
                                    className="field-box-event-description"
                                    placeholder="Here could be your description"
                                    required
                                    onChange={(e) => this.updateDescription(e)}
                                    value={description}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col md="5">
                                <Label className="label-date-event">Date of event</Label>
                                {!this.state.validDate && <span className="text-validate-date">
                                       must be after current date
                                </span>}
                                <Input
                                    type="datetime-local"
                                    name="event_date"
                                    className="field-box-event-date"
                                    onChange={this.updateDate}
                                    value={moment(date).format("YYYY-MM-DDTHH:mm:ss")}
                                />
                            </Col>
                            <Col md={{size: 4, offset: 1}}>
                                <FormGroup className="location-formgroup-event ">
                                    <Label>Location*</Label>
                                    {!this.state.location && <span className="text-validate-date">
                                       can't be empty
                                </span>}
                                    <LocationSearchInput
                                        required
                                        name="location-event"
                                        placeholder="Rivne"
                                        updateLocation={this.updateLocation}
                                        city={this.state.location}
                                        className="field-box"
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="12" sm="12">
                                <ImageUpload updateUrl={this.updateEventImage}/>
                            </Col>
                        </Row>
                        <Row>
                            <div className=" card-footer your-image">
                                <img width="100%"
                                     height="250px"
                                     src={alt_avatar}
                                     alt="2"
                                />
                            </div>
                        </Row>
                        <Row>
                            <Row sm="6" md={{size: 4, offset: 6}}>
                                <Col>
                                    <Link to="/eventcreate" className="">
                                        <Button type="button"
                                                className="return-to-events"
                                                block>
                                            Return to Events
                                        </Button>
                                    </Link>
                                </Col>
                                <Col>
                                    <Button color="secondary"
                                            type="button"
                                            size="lg"
                                            className="button-create-event button-event-save-changes"
                                            block
                                            onClick={() => this.saveForm()}>
                                        Save changes
                                    </Button>
                                </Col>
                            </Row>
                        </Row>
                    </FormGroup>
                </Col>
            </Form>
        )
    }
}